import { rm } from "fs/promises";
import { join } from "path";

/**
 * Deletes entire db after each test
 */
global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch (error) {
        console.log(error)
    }
})