import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate, PostIcon } from './posts';
import CRUD from '../Crud_Product/CRUD';
import CRUD_add from '../Crud_Product/CRUD_add';
import CRUD_edit from '../Crud_Product/CRUD_edit';
import Categories from '../Crud_categories/Categories';
import { render } from 'react-dom'
import simpleRestProvider from 'ra-data-simple-rest';

export default function Administrator() {

    return render(
        <Admin dataProvider={simpleRestProvider('http://localhost:3002')}>
            <Resource name="Products" list={CRUD} edit={CRUD_edit} create={CRUD_add} icon={PostIcon} />
            <Resource name="Categories" list={Categories} icon={PostIcon} />
        </Admin>,
        document.getElementById('root')
    );

}