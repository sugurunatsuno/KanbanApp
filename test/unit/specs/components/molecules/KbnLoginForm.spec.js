import { mount } from '@vue/test-utils'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {onlogin: () => {}}
        })

        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('Validation.email.requiredがinvalidであること', () => {
              loginForm.setData({email: ''})
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })

          describe('入力あり', () => {
            it('Validation.email.requiredがvalidであること', () => {
              loginForm.setData({email: 'foo@domain.com'})
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })

          describe('メールアドレス形式ではないフォーマット', () => {
            it('Validation.email.requiredがinvalidであること', () => {
              loginForm.setData({email: 'foobar'})
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })

          describe('メールアドレス形式のフォーマット', () => {
            it('Validation.email.requiredがvalidであること', () => {
              loginForm.setData({email: 'foo@domain.com'})
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.password.requiredがinvallidであること', () => {
              loginForm.setData({password: ''})
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })

          describe('入力あり', () => {
            it('validation.password.requiredがvallidであること', () => {
              loginForm.setData({password: 'xxxx'})
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })
        })
      })
    })

    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {onlogin: () => {}}
        })

        loginForm.vm.$nextTick(done)
      })

      describe('バリデーション項目全てOK', () => {
        it('validになること', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: '12345678'
          })
        })
        expect(loginForm.vm.valid).to.equal(true)
      })

      describe('バリデーション項目NGあり', () => {
        it('validになること', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: ''
          })
        })
        expect(loginForm.vm.valid).to.equal(false)
      })
    })
  })

  describe('disableLoginAction', () => {
    let loginForm
    beforeEach(done => {
      loginForm = mount(KbnLoginForm, {
        propsData: () => {}
      })
      loginForm.vm.$nextTick(done)
    })

    describe('バリデーションNG項目あり', () => {
      it('ログイン処理は無効', () => {
        loginForm.setData({
          email: 'foo@example.com',
          password: ''
        })
        expect(loginForm.vm.disableLoginAction).to.equal(false)
      })
    })

    describe('バリデーション項目全てOKかつログイン処理中でない', () => {
      it('ログイン処理は有効', () => {
        loginForm.setData({
          email: 'foo@example.com',
          password: '12345678'
        })
        expect(loginForm.vm.disableLoginAction).to.equal(true)
      })
    })

    describe('バリデーション項目全てOKかつログイン処理中', () => {
      it('ログイン処理は有効', () => {
        loginForm.setData({
          email: 'foo@example.com',
          password: '12345678',
          progress: true
        })
        expect(loginForm.vm.disableLoginAction).to.equal(true)
      })
    })
  })

  describe('onlogin', () => {
    let loginForm
    let onloginStub
    beforeEach(done => {
      onloginStub = sinon.stub()
      loginForm = mount(KbnLoginForm, {
        propsData: {
          onlogin: onloginStub
        }
      })
      loginForm.setData({
        email: 'foo@example.com',
        password: '12345678'
      })
      loginForm.vm.$nextTick(done)
    })

    describe('resolve', () => {
      it('resolveされること', done => {
        onloginStub.resolves()

        loginForm.find('button').trigger('click')
        expect(onloginStub.called).to.equal(false) // まだresolveされない
        expect(loginForm.vm.error).to.equal('')
        expect(loginForm.vm.disableLoginAction).to.equal(true) // ログインアクションは不可

        // 状態の反映
        loginForm.vm.$nextTick(() => {
          expect(onloginStub.called).to.equal(true) // resolveされた
          const authinfo = onloginStub.args[0][0]
          expect(authinfo.email).to.equal(loginForm.vm.email)
          expect(authinfo.password).to.equal(loginForm.vm.password)
          loginForm.$nextTick(() => {
            expect(loginForm.vm.error).to.equal('')
            expect(loginForm.vm.disableLoginAction).to.equal(false)
            done()
          })
        })
      })
    })

    describe('reject', () => {
      it('rejectされること', done => {
        onloginStub.rejects(new Error('login error!'))

        loginForm.find('button').trigger('click')
        expect(onloginStub.called).to.equal(false) // まだrejectされない
        expect(loginForm.vm.error).to.equal('')
        expect(loginForm.vm.disableLoginAction).to.equal(true) // ログインアクションは不可

        // 状態の反映
        loginForm.vm.$nextTick(() => {
          expect(onloginStub.called).to.equal(true) // rejectされた
          const authinfo = onloginStub.args[0][0]
          expect(authinfo.email).to.equal(loginForm.vm.email)
          expect(authinfo.password).to.equal(loginForm.vm.password)
          loginForm.$nextTick(() => {
            expect(loginForm.vm.error).to.equal('login error!')
            expect(loginForm.vm.disableLoginAction).to.equal(false)
            done()
          })
        })
      })
    })
  })
})
