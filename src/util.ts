import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getSolidDataset, 
         getStringNoLocale, 
         getThing,
         getUrl, 
         type SolidDataset 
} from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';

/* 
 * See: https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/
 * for documentation on Inrupt Solid Authn API
 */

export function isLoggedIn() : boolean {
    return getDefaultSession().info.isLoggedIn;
}

export type ProfileType = {
    webId: string,
    givenName: string | undefined,
    familyName: string | undefined,
    name: string | undefined,
    img: string | undefined,
    data: SolidDataset
};

export async function fetchUserProfile(webId: string) : Promise<ProfileType> {
    const dataset      = await getSolidDataset(webId);
    const me           = getThing(dataset,webId);
    const givenName    = getStringNoLocale(me,FOAF.givenName);
    const familyName   = getStringNoLocale(me,FOAF.familyName);
    const name         = getStringNoLocale(me,FOAF.name);
    const img          = getUrl(me,FOAF.img);

    return {
        webId: webId ,
        givenName: givenName,
        familyName: familyName, 
        name:  name,
        img: img ,
        data: dataset
    };
}