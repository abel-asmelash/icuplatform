// app/(root)/profile/[id]/page.tsx
const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Profile: {params.id}</h1>
    </div>
  );
};

export default ProfilePage;
