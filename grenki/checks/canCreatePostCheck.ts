import UserModel from "../model/UserModel"
import CommunityModel from "../model/CommunityModel"

export default async function canCreatePostCheck(
  author: string,
  community: string,
  userModel: UserModel,
  communityModel: CommunityModel
): Promise<boolean> {
  const userExists = await userModel.exists(author)
  const communityExists = await communityModel.exists(community)
  return userExists && communityExists
}
