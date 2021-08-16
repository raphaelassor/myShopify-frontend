import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
export const PageSwapper=({page,onSwap})=>{
return <div className="page-swapper flex justify-center btn-bar">
    <button className="swapper btn-neutral btn-md" onClick={()=>onSwap(-1)} disabled={page===0}>
    <LeftIcon/>
    </button>
    <button className="swapper btn-neutral btn-md" onClick={()=>onSwap(+1)} >
    <RightIcon/>
    </button>
</div>
}