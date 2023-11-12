import { Slider, Typography } from '../../component'

import s from './controls.module.scss'

export const Controls = (props: any) => {
  return (
    <section className={s.component}>
      <Typography as={'label'} htmlFor={'pagination'} variant={'body2'}>
        Number of cards
      </Typography>
      <Slider id={'pagination'} {...props} />
    </section>
  )
}
