export function domainMatches(domain: string, email: string) {
  const emailDomain = email.split("@")[1].toLowerCase();
  if (domain == "*") return true;
  const regexPattern = domain.replace(/\*/g, "[a-zA-Z0-9-]*").replace(".", "\\.");
  const regex = new RegExp("^" + regexPattern + "$");
  return regex.test(emailDomain);
}
