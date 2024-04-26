// userProfileStore.ts

let userProfile: any = null;

export const getUserProfile = () => userProfile;

export const setUserProfile = (profile: any) => {
  userProfile = profile;
};
