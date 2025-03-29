import GenericLookup from "./GenericLookup";

function ContactLookup(props) {
   return (
      <GenericLookup
         table="contacts"
         labelField="name"
         valueField="custom_id"
         placeholder="Search contacts..."
         {...props}
      />
   );
}

export default ContactLookup;
