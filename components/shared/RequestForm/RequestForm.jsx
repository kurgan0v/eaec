"use client";
import {Alert, Button, Form, Input} from "antd";
import {useState} from "react";
import {useMutation} from "react-query";
import {API_URL} from "@/components/app/const";
import s from './RequestForm.module.scss';

export default function RequestForm(){
    const [form] = Form.useForm();
    const [randomNumber1, setRandomNumber1] = useState(generateRandomNumber());
    const [randomNumber2, setRandomNumber2] = useState(generateRandomNumber());
    const {mutateAsync: sendForm, isLoading, isSuccess} = useMutation(async (values)=>{
        const res = await fetch(`${API_URL}submit_feedback/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        form.resetFields();
        return res.json();
    })
    function generateRandomNumber() {
        return Math.floor(Math.random() * 90 + 10); // Генерируем случайное двузначное число от 10 до 99
    }

    return(
        <Form
            form={form}
            layout={'vertical'}
            onFinish={(values)=>{
                sendForm(values)
            }}
        >
            {isSuccess && <Alert message="Запрос успешно отправлен! Ожидайте назначения исполнителя." type="success" />}
            <Form.Item label={'Наименование товара'} name={'product_name'} rules={[
                {
                    required: true,
                    message: 'Это обязательное поле',
                },
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item label={'Наименование изготовителя'} name={'manufacturer_name'} rules={[
                {
                    required: true,
                    message: 'Это обязательное поле',
                },
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item
                name="full_name"
                rules={[
                    {
                        required: true,
                        message: 'Это обязательное поле',
                    },
                ]}
                label={'ФИО представителя'}
            >
                <Input  />
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите телефон',
                    },
                ]}
                label={'Телефон'}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={'Электронная почта'}
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите электронную почту',
                    },
                    {
                        type: 'email',
                        message: 'Некорректный формат электронной почты',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="company_name"
                rules={[
                    {
                        required: true,
                        message: 'Это обязательное поле',
                    },
                ]}
                label={'Наименование заявителя'}
            >
                <Input  />
            </Form.Item>
            <Form.Item
                label={`${randomNumber1} + ${randomNumber2} = ?`}
                name="captcha"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите сумму чисел',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const sum = randomNumber1 + randomNumber2;
                            if (parseInt(value, 10) === sum) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Неверная сумма чисел'));
                        },
                    }),
                ]}
            >
                <Input placeholder="Введите сумму"  />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} className={s.searchButton}>
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    )
}
