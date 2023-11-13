import Domain from "./models/domain";
import Pending from "./models/pending";

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

  public async addPending(email: string, userId: string, code: string): Promise<void> {
    await Pending.create({ email, userId, code });
  }

  public async deletePending(id: number): Promise<void> {
    await Pending.destroy({ where: { id } });
  }

  public async getAllPending(): Promise<Pending[]> {
    return await Pending.findAll();
  }

  public async getPending(userId: string): Promise<Pending | null> {
    return await Pending.findOne({ where: { userId } });
  }

  public async incrementAttempts(id: number): Promise<void> {
    await (await Pending.findOne({ where: { id } }))?.increment("attempts");
  }
}
