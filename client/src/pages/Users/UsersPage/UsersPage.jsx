import UserList from '../UserList/UserList';

const users = [
  {
    username: 'Brad',
    handle: '@brad',
    certification: 'Open Water Diver',
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    username: 'Barbara',
    handle: '@barb',
    certification: 'Advanced Diver',
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.",
  },
  {
    username: 'Mike',
    handle: '@mike',
    certification: 'Rescue Diver',
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    username: 'Stacy',
    handle: '@stacy',
    certification: 'Divemaster',
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nLorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
];

const UsersPage = () => {
  return (
    <UserList users={users} />
  );
};

export default UsersPage;
