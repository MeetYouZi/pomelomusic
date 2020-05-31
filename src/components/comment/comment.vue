<template>
  <div class="commentBox">
    <ul class="comment_list">
      <li class="comment_item" v-for="item in hotCommentList" :key="item.id">
        <div class="comment_item_avatar">
          <img v-lazy="`${item.user.avatarUrl}?param=50y50`">
        </div>
        <div class="comment_item_content">
          <div class="comment_header">
            <div class="header_left">
              <p class="nickname">{{item.user.nickname}}</p>
              <p class="time">{{item.time | format}}</p>
            </div>
            <div class="header_right">
              <span class="likeNum">{{item.likedCount}}</span>
              <i class="iconfont icondianzan"></i>
<!--              <icon-praise></icon-praise>-->
            </div>
          </div>
          <div class="comment_desc">
            {{item.content}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/format'
import iconPraise from '@/components/icons/icon_praise'
export default {
  name: 'comment',
  components: {
    iconPraise
  },
  props: {
    hotCommentList: {
      type: Array,
      default () {
        return []
      }
    },
    commentList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    format (time) {
      const date = new Date(time)
      return dateFormat(date, 'yyyy年MM月dd日')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.commentBox
  position relative
  .comment_list
    position relative
  .comment_item
    display flex
    margin-top 16px
    .comment_item_avatar
      margin-right 8px
      width 36px
      height 36px
      border-radius 50%
      overflow hidden
    .comment_item_content
      flex 1
      border-bottom 1px solid var(--bgborder)
      padding-bottom 10px
      box-sizing border-box
      .comment_header
        display flex
        justify-content space-between
        color var(--c_txt2)
        line-height 20px
        margin-bottom 6px
        .header_right
          text-align right
          width 90px
          color var(--c_txt2)
          .likeNum
            font-size $font-size-small
            padding-right 5px
        .header_left
          flex 1
          .nickname
            color var(--c_txt2)
            font-size $font-size-medium
          .time
            color var(--c_txt2)
            font-size $font-size-small
      .comment_desc
        font-size $font-size-medium
        color var(--c_txt1)
        line-height 20px
        text-align justify
</style>
