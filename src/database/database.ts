import Domain from "./models/domain";
import Pending from "./models/pending";
import Verified from "./models/verified";

export class DiscordDatabase {
  private static instance: DiscordDatabase;

  private constructor() {}

  public static getInstance(): DiscordDatabase {
    if (!DiscordDatabase.instance) {
      DiscordDatabase.instance = new DiscordDatabase();
    }
    return DiscordDatabase.instance;
  }

  public async addDomain(domain: string, userId: string): Promise<void> {
    await Domain.create({ domain, userId });
  }

  public async deleteDomain(domain: string): Promise<void> {
    await Domain.destroy({ where: { domain } });
  }

  public async getDomains(): Promise<Domain[]> {
    return await Domain.findAll();
  }

  public async getDomain(domain: string): Promise<Domain | null> {
    return await Domain.findOne({ where: { domain } });
  }

  public async addPending(email: string, userId: string): Promise<void> {
    await Pending.create({ email, userId });
  }

  public async deletePending(email: string, userId: string): Promise<void> {
    await Pending.destroy({ where: { email, userId } });
  }

  public async getPending(userId: string): Promise<Pending[]> {
    return await Pending.findAll({ where: { userId } });
  }

  public async getPendingEmail(userId: string, email: string): Promise<Pending | null> {
    return await Pending.findOne({ where: { userId, email } });
  }

  public async incrementAttempts(userId: string, email: string): Promise<void> {
    await (await this.getPendingEmail(userId, email))?.increment("attempts");
  }

  public async addVerified(userId: string, email: string): Promise<void> {
    await Verified.create({ email, userId });
  }
}
