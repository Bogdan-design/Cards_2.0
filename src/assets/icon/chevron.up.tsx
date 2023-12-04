import { forwardRef, memo, Ref, SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="M9.77 7.257a.5.5 0 0 1-.82.385l-2.68-2.24-2.684 2.16a.5.5 0 0 1-.705-.075.5.5 0 0 1 .075-.73l3-2.415a.5.5 0 0 1 .635 0l3 2.5a.5.5 0 0 1 .18.415Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
