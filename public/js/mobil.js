import  GetServicesSelect from "./interogateServiceSelect";
import { getSelectInformation } from "./selectUI";


document.querySelectorAll('.select---mobile--service').forEach((selects)=>{
  selects.addEventListener('change',async ()=>{
    let selVal = selects.value;
      //GET CLASS
      const getServices = new GetServicesSelect(selVal);
      //Get Function
      await getServices.getAllServices();

      const getApi = getServices.get_Serv;

      getSelectInformation(getApi);
  });
});




