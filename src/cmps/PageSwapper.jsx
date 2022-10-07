import LeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RightIcon from '@mui/icons-material/KeyboardArrowRight';
// TODO : deal with hover on disabled
export const PageSwapper = ({ page, onSwap, last }) => {
  return (
    <div className="page-swapper flex justify-center btn-bar">
      <button
        className="swapper btn-neutral btn-md"
        onClick={() => onSwap(-1)}
        disabled={page === 0}
      >
        <LeftIcon />
      </button>
      <button
        className="swapper btn-neutral btn-md"
        onClick={() => onSwap(+1)}
        disabled={last}
      >
        <RightIcon />
      </button>
    </div>
  );
};
