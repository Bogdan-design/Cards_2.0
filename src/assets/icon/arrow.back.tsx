import { forwardRef, memo, Ref, SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="M12.667 7.333H4.76l2.42-2.906a.667.667 0 1 0-1.027-.854l-3.333 4a.794.794 0 0 0-.06.1c0 .034 0 .054-.047.087a.667.667 0 0 0-.046.24c0 .082.016.164.046.24 0 .033 0 .053.047.087a.794.794 0 0 0 .06.1l3.333 4a.668.668 0 0 0 1.027-.854L4.76 8.667h7.907a.667.667 0 1 0 0-1.334Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
