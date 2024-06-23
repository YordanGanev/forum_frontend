export const getAvatarImage = (signature: string) => {
  return `https://cdn.auth0.com/avatars/${signature
    .slice(0, 2)
    .toLocaleLowerCase()}.png`;
};
