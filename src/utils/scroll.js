import { Toast } from 'mint-ui'
import BScroll from 'better-scroll'
import http from 'utils/http'
import _ from 'lodash'

export const scroll = ({
  el,
  data,
  inTheater = null,
  url,
  vm,
  paging = {},
  horizontal = false
}) => {
  let count = 0

  let movieIds = _.chunk(inTheater && inTheater.movieIds.slice(12) || {}, 10)

  // 声明BScroll
  let bscroll = new BScroll(el, {
    scrollX: horizontal,
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
          token: '', // 加个token, 不然拿不到更多数据
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

  // 监听横向滚动
  let reachThreshold = false
  let hasMore = true
  bscroll.on('scroll', () => {
    if (horizontal) {
      const threshold = 50
      const curPosition = bscroll.maxScrollX - bscroll.x
      if (curPosition > threshold) {
        reachThreshold = true
      }
    }
  })
  bscroll.on('scrollEnd', async () => {
    if (horizontal && reachThreshold && hasMore) {
      count++
      // 分页的ajax请求
      let result = await http({
        url,
        method: 'get',
        params: {
          token: '',
          ci: paging.ci,
          limit: paging.limit,
          offset: count * paging.limit
        }
      })
      // hasMore 要每次取新的Ajax请求的hasMore
      hasMore = result.paging.hasMore

      vm.mostExpected.push(...result.coming)

      // $nextTick 等待mostExpected被渲染到DOM上
      vm.$nextTick(() => {
        bscroll.refresh()
      })
    }

    if (!hasMore) {
      Toast({
        message: '到头了~',
        position: 'top',
        duration: 1000
      })
    }
  })
}