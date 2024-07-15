export const seeProfileQuery = (userId: number) => `
  {
    seeProfile(userId: ${userId}) {
      ok
      error
      user {
        id
      }
    }
  }
`;
