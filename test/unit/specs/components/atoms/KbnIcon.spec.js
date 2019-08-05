import KbnIcon from '@/components/atoms/KbnIcon.vue'

describe('KbnIcon', () => {
  describe('算出プロパティ', () => {
    describe('icon', () => {
      it('close', () => {
        // 算出用の必要なパラメータ
        const name = {name: 'close'}
        // computed.functionName.call(propData)で呼び出す
        expect(KbnIcon.computed.icon.call(name)).to.equal('x')
      })

      it('add', () => {
        // 算出用の必要なパラメータ
        const name = {name: 'add'}
        // computed.functionName.call(propData)で呼び出す
        expect(KbnIcon.computed.icon.call(name)).to.equal('+')
      })
    })
  })
})
