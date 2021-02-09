// 使用 Enzyme
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils';

it('Header 渲染样式正常', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});

it('Header 组件包含一个 input 框', () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, 'input');
    expect(inputElem.length).toBe(1);
});

it('Header 组件 input 框内容，初始化应该为空', () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, 'input');
    expect(inputElem.prop('value')).toEqual('');
});

it('Header 组件 input 框内容，当用户输入时，会跟随变化', () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, 'input');
    const userInput = 'jest';
    // simulate 模拟事件触发
    inputElem.simulate('change', {
        target: {
            value: userInput,
        },
    });
    // 对 state 数据做测试；单元测试中，面向数据的测试会更简单
    expect(wrapper.state('value')).toEqual(userInput);

    // 对 dom 上的属性做测试；集成测试中，倾向测 dom 的展示，
    // const newInputElem = wrapper.find('[data-test="input"]')
    // expect(newInputElem.prop('value')).toBe(userInput)
});

it('Header 组件 input 框内容，如果 input 无内容，无操作', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    wrapper.setState({ value: '' });
    inputElem.simulate('keyUp', {
        keyCode: 13,
    });
    expect(fn).not.toHaveBeenCalled();
});

it('Header 组件 input 框内容，如果 input 有内容，函数应该被调用', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    const userInput = 'jest';
    wrapper.setState({ value: userInput });
    inputElem.simulate('keyUp', {
        keyCode: 13,
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput);
    expect(inputElem.prop('value')).toBe('');
});

it('Header 组件 input 框内容，如果 input 有内容，最后应该清除掉', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    const userInput = 'jest';
    wrapper.setState({ value: userInput });
    inputElem.simulate('keyUp', {
        keyCode: 13,
    });
    const newInputElem = findTestWrapper(wrapper, 'input');
    expect(newInputElem.prop('value')).toBe('');
});
