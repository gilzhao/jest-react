// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const div = render(<App />);
//   // const textElement = screen.getByText(/hello/i);
//   // expect(textElement).toBeInTheDocument();
//   const container = div.container.getElementsByClassName('App')
//   expect(container.length).toBe(2)
// });


// 使用 Enzyme
import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

it('renders learn react link', () => {
  const wrapper = shallow(<App />)  // 1.浅渲染
  // 2.debug 调试模式 写在 expect 之前，就可以把组件打印出来，核对出问题的点
  expect(wrapper.find('.app-container').length).toBe(1);
  expect(wrapper.find('.app-container').prop('title')).toBe('gil')
})

// 测试和代码逻辑解耦，优点：逻辑和样式做了变更，也不会影响测试
it('3、针对测试的属性选择器', () => {
  const wrapper = shallow(<App />)
  // expect(wrapper.find('[data-test="container"]').length).toBe(1);
  // expect(wrapper.find('[data-test="container"]').prop('title')).toBe('gil')
  const conatiner = wrapper.find('[data-test="container"]')
  expect(conatiner).toExist()
  expect(conatiner).toHaveProp('title', 'gil')
})

it('4、集成测试 mount', () => {
  const wrapper = mount(<App />)
  expect(wrapper).toMatchSnapshot()
})

// 单元测试适合用 shallow
// 集成测试适合用 mount
// snapshot 适合组件测试

