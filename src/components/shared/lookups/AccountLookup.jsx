import GenericLookup from "./GenericLookup";

function AccountLookup(props) {
   return (
      <GenericLookup
         table="accounts"
         labelField="name"
         valueField="custom_id"
         placeholder="Search accounts..."
         {...props}
      />
   );
}

export default AccountLookup;
