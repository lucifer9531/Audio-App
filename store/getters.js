const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  customerId: state => state.user.customerId,
}
export default getters
