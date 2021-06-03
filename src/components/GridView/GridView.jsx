import style from './GridView.module.css'
import Card from '../Card/Card'

function GridView({ list }) {

  return (
    <div className={style['grid-view']}>
      {list.map(item => {
        // if (item.src === undefined) return null
        return (
          <Card key={item.id} id={item.id} over_18={item.over_18}
            imgSrc={item.src} />
        )
      })}
    </div>
  )
}

export default GridView;