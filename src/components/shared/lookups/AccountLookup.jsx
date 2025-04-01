import GenericLookup from "./GenericLookup";

function AccountLookup(props) {
   return (
      <GenericLookup
         table="account"
         labelField="name"
         valueField="custom_id"
         placeholder="Search accounts..."
         {...props}
      />
   );
}

export default AccountLookup;
