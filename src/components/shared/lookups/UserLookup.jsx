import GenericLookup from "./GenericLookup";

function UserLookup(props) {
   return (
      <GenericLookup
         table="users"
         labelField="name"
         valueField="custom_id"
         placeholder="Search users..."
         {...props}
      />
   );
}

export default UserLookup;
