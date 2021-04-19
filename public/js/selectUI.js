export const getSelectInformation = async (select_info)=>{

    const select = select_info.data;
    
    document.querySelectorAll('.createMobilCard').forEach((addId)=>{
        const markup  = `
            <div class="card mobile_adapt_card">
                <form><input class="add_id_bydeff" type="hidden" value="${select._id}"></form>
                <a class="edit_service_icons" href="get-service/${select._id}" target="_self"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                <div class="card-body">
                    <h5 class="card-title title_draggable_title">${select.serviceName}</h5>
                    <p class="card-text text_drag_text">${select.descriereServiciu}</p>
                </div>
        </div>
        `;

        addId.insertAdjacentHTML('afterend', markup);
    })

}







