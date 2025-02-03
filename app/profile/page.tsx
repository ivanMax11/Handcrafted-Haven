import EditProfileForm from './editProfileForm'
import ListedProducts from './listedProducts'
import SocialLinks from './socialLinks'

const ProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Perfil Header */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
        <div className="flex flex-col items-center lg:items-start space-y-4 w-full lg:w-1/3">
          <EditProfileForm />
        </div>
      </div>
      <div className="w-full lg:w-2/3">
    <SocialLinks links={[{ platform: 'Facebook', url: '#' }]} />
    </div>

      {/* Productos Listados */}
      <ListedProducts />
    </div>
  )
}

export default ProfilePage
