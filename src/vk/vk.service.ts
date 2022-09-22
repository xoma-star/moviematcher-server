import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'

@Injectable()
export class VkService {
    validateSign(url: string): boolean{
        const vk_secret = 'EMGtSbU8xcx1i3SyBcIt'
        let sign;
        const queryParams: {key: string, value: string}[] = [];

        /**
         * Функция, которая обрабатывает входящий query-параметр. В случае передачи
         * параметра, отвечающего за подпись, подменяет "sign". В случае встречи
         * корректного в контексте подписи параметра добавляет его в массив
         * известных параметров.
         * @param key
         * @param value
         */
        const processQueryParam = (key: string, value: any) => {
            if (typeof value === 'string') {
                if (key === 'sign') {
                    sign = value;
                } else if (key.startsWith('vk_')) {
                    queryParams.push({key, value});
                }
            }
        };

        for (const key of JSON.parse(url)) {
            processQueryParam(key.key, key.value);
        }

        // Обрабатываем исключительный случай, когда не найдена ни подпись в параметрах,
        // ни один параметр, начинающийся с "vk_", дабы избежать
        // излишней нагрузки, образующейся в процессе работы дальнейшего кода.
        if (!sign || queryParams.length === 0) {
            return false;
        }
        // Снова создаём query в виде строки из уже отфильтрованных параметров.
        const queryString = queryParams
            // Сортируем ключи в порядке возрастания.
            .sort((a, b) => a.key.localeCompare(b.key))
            // Воссоздаём новый query в виде строки.
            .reduce((acc, {key, value}, idx) => {
                return acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`;
            }, '');

        // Создаём хеш получившейся строки на основе секретного ключа.
        const paramsHash = crypto
            .createHmac('sha256', vk_secret)
            .update(queryString)
            .digest()
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=$/, '');

        return paramsHash === sign;
    }
}
