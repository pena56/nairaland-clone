import ProfileBanner from '../components/ProfileBanner';
import PostBanner from '../components/PostBanner';

function Profile({ match }) {
  return (
    <div>
      <ProfileBanner displayName={match.params.displayName} />
      <PostBanner />
    </div>
  );
}

export default Profile;
