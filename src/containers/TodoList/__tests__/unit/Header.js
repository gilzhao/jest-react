// 使用 Enzyme
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils';

describe('Header 组件', () => {
    it('渲染样式正常', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper).toMatchSnapshot();
    });

    it('含输入框', () => {
        const wrapper = shallow(<Header />);
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem.length).toBe(1);
    });

    it('输入框内容初始化为空', () => {
        const wrapper = shallow(<Header />);
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem.prop('value')).toEqual('');
    });

    it('输入框内容随用户输入变化', () => {
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

    it('输入框无内容时触发回车，无反应', () => {
        const fn = jest.fn();
        const wrapper = shallow(<Header addUndoItem={fn} />);
        const inputElem = findTestWrapper(wrapper, 'input');
        wrapper.setState({ value: '' });
        inputElem.simulate('keyUp', {
            keyCode: 13,
        });
        expect(fn).not.toHaveBeenCalled();
    });

    it('输入框有内容被回车事件被触发时，外部传入的函数被调用，内容清空', () => {
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
        const newInputElem = findTestWrapper(wrapper, 'input');
        expect(newInputElem.prop('value')).toBe('');
    });
});
