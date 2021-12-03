import React,{useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Pagination({pagination}) {
    const history = useHistory()
    const params = useParams()
    const [pageno, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(paginateFunction,[params?.page])

    function paginateFunction(){
        setPageNo(params?.page)
    }
    return (
        <div style={{ display: 'flex', flexContent: 'space-between'}}>
            <Button className="dark" 
            disabled={!pagination?.hasPrevPage}
            onClick={e => setPageNo(parseInt(pagination?.prev))}
            > <span className="fa fa-arrow-circle-o-left text-success"></span></Button>
            <select className="form-control" 
            onChange={e => {
                e.preventDefault();
                console.log(e.target.value)
                history.push(`/solve-tbs/${params.filter}/${e.target.value}`)
            }}
            >
                <option value="1">{isLoading ?'Pro...':'Page'}</option>{console.log(pagination)}
                {/* {[...Array(pagination).map((t,i) => {
                    console.log("asdsa")
                    return (
                        <option value={i+1}
                            key={i+1}
                            selected={(+pagination?.currentPage === +i+1)?'selected':''}
                        >{i+1}</option>
                    )
                })]} */}
                {[...Array(pagination)].map((e, i) => {
                    return(
                        <option  value={i+1}
                        key={i+1}
                        selected={(+params?.page_no === +i+1) ? 'selected' : ''}
                        >{i+1}</option>
                    )
                })}
                {/* {[...Array(pagination?.pageCount).fill().map( (t,i) => {
                    return (
                        <option value={i+1}
                            key={i+1}
                            selected={(+pagination?.currentPage === +i+1)?'selected':''}
                        >{i+1}</option>
                    )
                })]} */}
            
            </select>
            <Button className="dark"
            disabled={!pagination?.hasNextPage}
            onClick={e => setPageNo(parseInt(pagination?.next))}
            > <span className="fa fa-arrow-circle-o-right text-success"></span></Button>
        </div>
    )
}

export default Pagination
