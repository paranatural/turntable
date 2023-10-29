import { Plugin } from '../core'

// TODO review SSR engines and make an API for them
/**
 * Allows to match routes without browser
 * */
export const serverPlugin: Plugin<{
  templateFile?: string;
}> = {

}
