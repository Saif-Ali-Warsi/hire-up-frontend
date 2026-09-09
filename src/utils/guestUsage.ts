const GUEST_USAGE_KEY = 'hireup_guest_usage';

export const MAX_GUEST_USES = 3;

export const getGuestUsage = (): number => {
  const usage = localStorage.getItem(GUEST_USAGE_KEY);

  if (!usage) {
    return 0;
  }

  return Number(usage);
};

export const getRemainingGuestUses = (): number => {
  const usage = getGuestUsage();

  return Math.max(MAX_GUEST_USES - usage, 0);
};

export const canGuestUse = (): boolean => {
  return getGuestUsage() < MAX_GUEST_USES;
};

export const consumeGuestUse = (): number => {
  const currentUsage = getGuestUsage();

  if (currentUsage >= MAX_GUEST_USES) {
    return currentUsage;
  }

  const newUsage = currentUsage + 1;

  localStorage.setItem(
    GUEST_USAGE_KEY,
    String(newUsage)
  );

  return newUsage;
};