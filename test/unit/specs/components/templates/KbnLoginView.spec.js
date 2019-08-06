import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

// ローカルなVueコンストラクタの作成
const localVue = createLocalVue()

// VueコンストラクタにVuexをインストール
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // ログインをするヘルパー関数
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // スタブの設定
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    // ルーターのモック設定
    $router = {push: sinon.spy()}

    // ログインアクションのスタブ
    actions = {login: sinon.stub()}

    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView
    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: $router,
          stubs: {'kbn-login-form': LoginFormComponentStub},
          store,
          localVue
        })
      })
      it('ボードページのルートにリダイレクトすること', done => {
        // loginアクションを成功とする
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })
  })
})
