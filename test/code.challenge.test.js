import axios from 'axios';
import { expect } from 'chai';
import fs from 'fs';

const apiBaseUrl = 'https://jsonplaceholder.org';

describe('REST API Test', () => {

    it('should GET data from jsonplaceholder', async ()=> {
        const response = await axios.get(`${apiBaseUrl}/posts`);

        expect(response.status).to.equal(200);
        const filteredData = response.data.map(responseFilter => ({
            slug: responseFilter.slug,
            status: responseFilter.status,
            publishedAt: responseFilter.publishedAt,
            updatedAt: responseFilter.updatedAt
        }));
        logResult(filteredData);
    });


    function logResult(response) {
        const markdown = formatAsMarkdown(response);
        writeMarkdownToFile(markdown);
    }

    function formatAsMarkdown(data) {
        let markdown = `
# API GET Test Result

| slug | status | publishedAt | updatedAt |
|------|--------|-------------|-----------|
`;
        data.forEach(post => {
            markdown += `| ${post.slug} | ${post.status} | ${post.publishedAt} | ${post.updatedAt} |\n`;
        });
        return markdown;
    }

    function writeMarkdownToFile(content) {
        const filePath = `apiResult.md`;
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Data written to ${filePath}`);
    }


});
