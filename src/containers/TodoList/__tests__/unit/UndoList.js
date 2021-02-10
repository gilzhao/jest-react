// 使用 Enzyme
import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils';

describe('UndoList 组件', () => {
    it('渲染样式正常', () => {
        const wrapper = shallow(<UndoList list={[]} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('列表数据为空数组时，count 数目为 0，列表无内容', () => {
        const wrapper = shallow(<UndoList list={[]} />);
        const countElem = findTestWrapper(wrapper, 'count');
        const listItem = findTestWrapper(wrapper, 'list-item');
        expect(countElem.text()).toEqual('0');
        expect(listItem.length).toEqual(0);
    });

    it('列表数据不为空，count 数目显示数据长度，列表不为空', () => {
        const listData = [
            {
                status: 'div',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const wrapper = shallow(<UndoList list={listData} />);
        const countElem = findTestWrapper(wrapper, 'count');
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(countElem.text()).toEqual(listData.length + '');
        expect(listItems.length).toEqual(listData.length);
    });

    it('列表数据有内容时，要存在删除按钮', () => {
        const listData = [
            {
                status: 'div',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const wrapper = shallow(<UndoList list={listData} />);
        const deleteItems = findTestWrapper(wrapper, 'delete-item');
        expect(deleteItems.length).toEqual(listData.length);
    });

    it('列表数据有内容时，点击某个删除按钮，会调用删除方法', () => {
        const listData = [
            {
                status: 'div',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const fn = jest.fn();
        const index = 1; // listData 数组下标，也可以生成随机数进行测试
        const wrapper = shallow(<UndoList deleteItem={fn} list={listData} />);
        const deleteItems = findTestWrapper(wrapper, 'delete-item');
        deleteItems.at(index).simulate('click');
        expect(fn).toHaveBeenLastCalledWith(index);
    });

    it('当某一项被点击时，触发执行 changeStatus 函数', () => {
        const listData = [
            {
                status: 'div',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const fn = jest.fn();
        const index = 1; // listData 数组下标，也可以生成随机数进行测试
        const wrapper = shallow(<UndoList changeStatus={fn} list={listData} />);
        const changeStatus = findTestWrapper(wrapper, 'list-item');
        changeStatus.at(index).simulate('click');
        expect(fn).toHaveBeenLastCalledWith(index);
    });

    it('当某一项状态是 input 时，展示输入框', () => {
        const listData = [
            {
                status: 'input',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const wrapper = shallow(<UndoList list={listData} />);
        const inputItems = findTestWrapper(wrapper, 'input');
        expect(inputItems.length).toBe(1);
    });

    it('当某一个 input 失去焦点时，触发执行 handleBlur 方法', () => {
        const listData = [
            {
                status: 'input',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const fn = jest.fn();
        const wrapper = shallow(<UndoList handleBlur={fn} list={listData} />);
        const inputElem = findTestWrapper(wrapper, 'input');
        inputElem.simulate('blur');
        expect(fn).toHaveBeenLastCalledWith(0);
    });

    it('当某一个输入框变更时，触发执行 valueChange 方法', () => {
        const listData = [
            {
                status: 'input',
                value: 'learn jest',
            },
            {
                status: 'div',
                value: 'learn TDD',
            },
        ];
        const value = 'learn react';
        const fn = jest.fn();
        const wrapper = shallow(<UndoList valueChange={fn} list={listData} />);
        const inputElem = findTestWrapper(wrapper, 'input');
        inputElem.simulate('change', {
            target: { value },
        });
        expect(fn).toHaveBeenLastCalledWith(0, value);
    });
});
