import style from './Card.module.css'
// import { useState } from 'react';
// import * as reddit from '../../services/reddit'
// import getCookie from '../../utils/getCookie'
import { ReactComponent as HeartIcon } from '../../svg/heart.svg';
import { ReactComponent as EyeIcon } from '../../svg/eye.svg';
// import { ReactComponent as EyeOffIcon } from '../../svg/eye-off.svg';
import { ReactComponent as ExtLinkIcon } from '../../svg/external-link.svg';
import { ReactComponent as MaximizeIcon } from '../../svg/maximize-2.svg';

function Card({ id, imgSrc, over_18 }) {
  // const [saved, setSaved] = useState(true)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // if (error) {
  //   return (
  //     <div className={style.card}>
  //       {`${error}`}
  //     </div>
  //   )
  // }

  // async function handleSave() {
  //   try {
  //     setLoading(true)
  //     // await new Promise(r => setTimeout(r, 3000))
  //     const access_token = getCookie('access_token')
  //     if (saved) {
  //       const data = await reddit.unsaveContent(id, access_token)
  //       console.log('unsave data:', data)
  //     } else {
  //       const data = await reddit.saveContent(id, access_token)
  //       console.log('save data:', data)
  //     }
  //     setSaved(saved => !saved)
  //     setLoading(false)
  //   } catch (error) {
  //     console.log('error:', error)
  //     setError(error)
  //     setLoading(false)
  //   }
  // }

  // function handleNSFW() {

  // }

  return (
    <div className={style.card}>
      {/* <div className={style.Bimage} style={{ backgroundImage: `url(${imgSrc})` }}></div> */}
      <img className={style.image} src={imgSrc} alt="thumbnail" />

      <div className={style.actions}>
        <div className={`${style.btn} ${style['maximize-btn']}`}>
          <MaximizeIcon className={style.icon} />
        </div>
        <div className={`${style.btn} ${style['ext-link-btn']}`}>
          <ExtLinkIcon className={style.icon} />
        </div>
        <div className={`${style.btn} ${style['eye-btn']}`}>
          <EyeIcon className={style.icon} />
        </div>
        <div className={`${style.btn} ${style['heart-btn']}`}>
          <HeartIcon className={style.icon} />
        </div>
      </div>
    </div>
  )
}

export default Card;