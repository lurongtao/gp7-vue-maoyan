import { Toast } from 'mint-ui'
import BScroll from 'better-scroll'
import http from 'utils/http'
import _ from 'lodash'

export const scroll = ({
  el,
  data,
  inTheater,
  url,
  vm
}) => {
  let count = 0

  let movieIds = _.chunk(inTheater.movieIds.slice(12), 10)

  // 声明BScroll
  let bscroll = new BScroll(el, {
    probeType: 1,
    pullUpLoad: {
      threshold: 50
    }
  })

  // 监听 pullingUp
  bscroll.on('pullingUp', async () => {
    if (count < movieIds.length) {
      // 分页的ajax请求
      let result = await http({
        url,
        method: 'get',
        params: {
          movieIds: movieIds[count].join(',')
        }
      })

      // 激起页面重新渲染
      data.push(...result.coming)

      // $nextTick 保证了本次refresh会拿到渲染好以后的movies
      vm.$nextTick(() => {
        bscroll.refresh()
        
        count++

        // 告诉better-scroll, 可以进行下次滑动了
        bscroll.finishPullUp()
      })
    }

    if ( count == movieIds.length ) {
      Toast({
        message: '到底了~',
        position: 'bottom',
        duration: 1000
      })

      // 告诉better-scroll, 可以进行下次滑动了
      bscroll.finishPullUp()
    }
  })
}