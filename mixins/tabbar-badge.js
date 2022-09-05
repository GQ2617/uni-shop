  import {mapGetters} from 'vuex'
	export default {
    methods:{
      setBadge(){
        uni.setTabBarBadge({
          index:2,
          text:this.total+'' //text只能为字符串类型
        })
      }
    },
    computed:{
      ...mapGetters('cart',['total'])
    },
    onShow(){
      this.setBadge()
    }
	}