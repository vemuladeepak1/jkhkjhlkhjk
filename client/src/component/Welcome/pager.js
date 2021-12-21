import React from 'react';
import { NavLink } from 'react-router-dom';

function pager({MaxPostPerAction, TotalPosts, ChangeButtonNumbers, Currentpage}) {

    let numbers=[];
    let NumberofButtons = TotalPosts/MaxPostPerAction;

  
    for(let i=1;i<Math.ceil(NumberofButtons);i++){
        numbers.push(i)
    }

    return (<>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
            <a class="page-link"  aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span  onClick={()=>ChangeButtonNumbers()}>Previous</span>
            </a>
            </li>
            {
                    numbers?.map((place,i)=>
                        <li className="page-item"  key={i}>
                            <NavLink to="" onClick={()=>ChangeButtonNumbers(place)} className="page-link" >{place}</NavLink>
                        </li>)
            }
            <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
            </li>
        </ul>
        </nav>

        </> );
}

export default pager;