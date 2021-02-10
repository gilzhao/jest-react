// 使用 Enzyme
import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils';

// it('Header 渲染样式正常', () => {
//     const wrapper = shallow(<Header />);
//     expect(wrapper).toMatchSnapshot();
// });

it('未完成列表当数据为空数组时 count 数目为 0，列表无内容', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('0');
    expect(listItem.length).toEqual(0);
});

it('未完成列表当数据有内容时 count 数目显示数据长度，列表不为空', () => {
    const listData = ['learn jest', 'learn TDD'];
    const wrapper = shallow(<UndoList list={listData} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual(listData.length + '');
    expect(listItems.length).toEqual(listData.length);
});

it('未完成列表当数据有内容时，要存在删除按钮', () => {
    const listData = ['learn jest', 'learn TDD'];
    const wrapper = shallow(<UndoList list={listData} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    expect(deleteItems.length).toEqual(listData.length);
});

it('未完成列表当数据有内容时，点击某个删除按钮，会调用删除方法', () => {
    const listData = ['learn jest', 'learn TDD'];
    const fn = jest.fn();
    const index = 1;  // listData 数组下标，也可以生成随机数进行测试
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    deleteItems.at(index).simulate('click');
    expect(fn).toHaveBeenLastCalledWith(index);
});
