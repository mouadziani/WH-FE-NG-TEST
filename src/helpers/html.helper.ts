export function replacetextLinkWithAnchorTag(content: string, link: string) {
    return content.trim().replace(new RegExp(link, 'g'), '<a href=' + link + '>' + link + '</a>');
}