// module.exports = {getLanguageById,submitBatch,submitToken};

const axios = require('axios');

const JUDGE0_URL = 'https://ce.judge0.com';

const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63
    };

    return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
    try {
        const response = await axios.post(
            `${JUDGE0_URL}/submissions/batch`,
            {
                submissions
            },
            {
                params: {
                    base64_encoded: 'false'
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 15000
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            'Judge0 batch submission error:',
            error.response?.status,
            error.response?.data || error.message
        );

        throw error;
    }
};

const waiting = (timer) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timer);
    });
};

const submitToken = async (resultToken) => {
    while (true) {
        try {
            const response = await axios.get(
                `${JUDGE0_URL}/submissions/batch`,
                {
                    params: {
                        tokens: resultToken.join(','),
                        base64_encoded: 'false',
                        fields: '*'
                    },
                    timeout: 15000
                }
            );

            const result = response.data.submissions;

            const isResultObtained = result.every(
                (submission) => submission.status_id > 2
            );

            if (isResultObtained) {
                return result;
            }

            await waiting(1000);
        } catch (error) {
            console.error(
                'Judge0 token submission error:',
                error.response?.status,
                error.response?.data || error.message
            );

            throw error;
        }
    }
};

module.exports = {
    getLanguageById,
    submitBatch,
    submitToken
};








// 


