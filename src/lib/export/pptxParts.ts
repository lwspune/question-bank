/**
 * The static OOXML skeleton of a .pptx: everything except the slides.
 *
 * Authored as string constants rather than shipping a PowerPoint-generated
 * .pptx blob, so the package stays diffable in review — and because PowerPoint
 * is not available on the server that generates these.
 *
 * Deliberately minimal: ONE slide master, ONE blank layout, a neutral theme.
 * The deck is a classroom question deck, so every slide paints its own white
 * background and black Cambria text explicitly rather than inheriting a theme
 * a future edit might change.
 */

/** English Metric Units per inch — the OOXML drawing unit. */
export const EMU_PER_INCH = 914400;

/** 16:9 widescreen, PowerPoint's default since 2013 (13.333in x 7.5in). */
export const SLIDE_WIDTH_EMU = 12192000;
export const SLIDE_HEIGHT_EMU = 6858000;

/** Half-inch margin on all four sides. */
export const MARGIN_EMU = 457200;
export const BODY_WIDTH_EMU = SLIDE_WIDTH_EMU - 2 * MARGIN_EMU;
export const BODY_HEIGHT_EMU = SLIDE_HEIGHT_EMU - 2 * MARGIN_EMU;

export const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
export const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
export const NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
export const NS_MC = "http://schemas.openxmlformats.org/markup-compatibility/2006";
export const NS_TABLE = "http://schemas.openxmlformats.org/drawingml/2006/table";
/** Office 2010 drawing extensions — the namespace that carries slide math. */
export const NS_A14 = "http://schemas.microsoft.com/office/drawing/2010/main";

const REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

export const PPTX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.presentationml.presentation";

const XML_DECL = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n`;

export function contentTypesXml(slideCount: number, mediaExtensions: string[]): string {
  const defaults = [
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>`,
    `<Default Extension="xml" ContentType="application/xml"/>`,
    ...Array.from(new Set(mediaExtensions)).map(
      (ext) => `<Default Extension="${ext}" ContentType="image/${ext === "jpg" ? "jpeg" : ext}"/>`
    ),
  ].join("");
  const slides = Array.from(
    { length: slideCount },
    (_, i) =>
      `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`
  ).join("");
  return (
    XML_DECL +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    defaults +
    `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>` +
    `<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>` +
    `<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>` +
    `<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>` +
    `<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>` +
    `<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>` +
    `<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>` +
    `<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>` +
    `<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>` +
    slides +
    `</Types>`
  );
}

export const ROOT_RELS_XML =
  XML_DECL +
  `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  `<Relationship Id="rId1" Type="${REL}/officeDocument" Target="ppt/presentation.xml"/>` +
  `<Relationship Id="rId2" Type="${REL}/metadata/core-properties" Target="docProps/core.xml"/>` +
  `<Relationship Id="rId3" Type="${REL}/extended-properties" Target="docProps/app.xml"/>` +
  `</Relationships>`;

/**
 * Slide relationship ids are allocated AFTER the fixed parts, so the numbering
 * below is load-bearing: rId1 is the master, rId2.. are slides, and the three
 * trailing parts take the ids after the last slide.
 */
export function presentationRelsXml(slideCount: number): string {
  const slides = Array.from(
    { length: slideCount },
    (_, i) =>
      `<Relationship Id="rId${i + 2}" Type="${REL}/slide" Target="slides/slide${i + 1}.xml"/>`
  ).join("");
  const n = slideCount + 2;
  return (
    XML_DECL +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="${REL}/slideMaster" Target="slideMasters/slideMaster1.xml"/>` +
    slides +
    `<Relationship Id="rId${n}" Type="${REL}/presProps" Target="presProps.xml"/>` +
    `<Relationship Id="rId${n + 1}" Type="${REL}/viewProps" Target="viewProps.xml"/>` +
    `<Relationship Id="rId${n + 2}" Type="${REL}/theme" Target="theme/theme1.xml"/>` +
    `<Relationship Id="rId${n + 3}" Type="${REL}/tableStyles" Target="tableStyles.xml"/>` +
    `</Relationships>`
  );
}

export function presentationXml(slideCount: number): string {
  // Slide ids must be >= 256 and unique; PowerPoint rejects lower values.
  const ids = Array.from(
    { length: slideCount },
    (_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`
  ).join("");
  return (
    XML_DECL +
    `<p:presentation xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}" saveSubsetFonts="1">` +
    `<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>` +
    `<p:sldIdLst>${ids}</p:sldIdLst>` +
    `<p:sldSz cx="${SLIDE_WIDTH_EMU}" cy="${SLIDE_HEIGHT_EMU}"/>` +
    `<p:notesSz cx="${SLIDE_HEIGHT_EMU}" cy="${SLIDE_WIDTH_EMU}"/>` +
    `</p:presentation>`
  );
}

export const SLIDE_MASTER_RELS_XML =
  XML_DECL +
  `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  `<Relationship Id="rId1" Type="${REL}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>` +
  `<Relationship Id="rId2" Type="${REL}/theme" Target="../theme/theme1.xml"/>` +
  `</Relationships>`;

export const SLIDE_LAYOUT_RELS_XML =
  XML_DECL +
  `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  `<Relationship Id="rId1" Type="${REL}/slideMaster" Target="../slideMasters/slideMaster1.xml"/>` +
  `</Relationships>`;

/** Every slide points at the single blank layout. */
export const SLIDE_RELS_XML =
  XML_DECL +
  `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  `<Relationship Id="rId1" Type="${REL}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>` +
  `</Relationships>`;

/** A slide with images additionally carries one relationship per picture. */
export function slideRelsXml(images: { id: string; target: string }[]): string {
  const extra = images
    .map((img) => `<Relationship Id="${img.id}" Type="${REL}/image" Target="${img.target}"/>`)
    .join("");
  return SLIDE_RELS_XML.replace("</Relationships>", `${extra}</Relationships>`);
}

const EMPTY_SP_TREE =
  `<p:spTree>` +
  `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
  `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
  `</p:spTree>`;

const CLR_MAP =
  `<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" ` +
  `accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>`;

export const SLIDE_MASTER_XML =
  XML_DECL +
  `<p:sldMaster xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}">` +
  `<p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>` +
  EMPTY_SP_TREE +
  `</p:cSld>` +
  CLR_MAP +
  `<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>` +
  `<p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles>` +
  `</p:sldMaster>`;

export const SLIDE_LAYOUT_XML =
  XML_DECL +
  `<p:sldLayout xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}" type="blank" preserve="1">` +
  `<p:cSld name="Blank">` +
  EMPTY_SP_TREE +
  `</p:cSld>` +
  `<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>` +
  `</p:sldLayout>`;

const COLOR_SCHEME =
  `<a:clrScheme name="Office">` +
  `<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>` +
  `<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>` +
  `<a:dk2><a:srgbClr val="44546A"/></a:dk2>` +
  `<a:lt2><a:srgbClr val="E7E6E6"/></a:lt2>` +
  `<a:accent1><a:srgbClr val="4472C4"/></a:accent1>` +
  `<a:accent2><a:srgbClr val="ED7D31"/></a:accent2>` +
  `<a:accent3><a:srgbClr val="A5A5A5"/></a:accent3>` +
  `<a:accent4><a:srgbClr val="FFC000"/></a:accent4>` +
  `<a:accent5><a:srgbClr val="5B9BD5"/></a:accent5>` +
  `<a:accent6><a:srgbClr val="70AD47"/></a:accent6>` +
  `<a:hlink><a:srgbClr val="0563C1"/></a:hlink>` +
  `<a:folHlink><a:srgbClr val="954F72"/></a:folHlink>` +
  `</a:clrScheme>`;

// Cambria throughout — the deck must match the Word paper's typography.
const FONT_SCHEME =
  `<a:fontScheme name="Cambria">` +
  `<a:majorFont><a:latin typeface="Cambria"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>` +
  `<a:minorFont><a:latin typeface="Cambria"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>` +
  `</a:fontScheme>`;

const SOLID = `<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>`;
const FMT_SCHEME =
  `<a:fmtScheme name="Office">` +
  `<a:fillStyleLst>${SOLID}${SOLID}${SOLID}</a:fillStyleLst>` +
  `<a:lnStyleLst>` +
  `<a:ln w="6350" cap="flat" cmpd="sng" algn="ctr">${SOLID}<a:prstDash val="solid"/></a:ln>` +
  `<a:ln w="12700" cap="flat" cmpd="sng" algn="ctr">${SOLID}<a:prstDash val="solid"/></a:ln>` +
  `<a:ln w="19050" cap="flat" cmpd="sng" algn="ctr">${SOLID}<a:prstDash val="solid"/></a:ln>` +
  `</a:lnStyleLst>` +
  `<a:effectStyleLst>` +
  `<a:effectStyle><a:effectLst/></a:effectStyle>` +
  `<a:effectStyle><a:effectLst/></a:effectStyle>` +
  `<a:effectStyle><a:effectLst/></a:effectStyle>` +
  `</a:effectStyleLst>` +
  `<a:bgFillStyleLst>${SOLID}${SOLID}${SOLID}</a:bgFillStyleLst>` +
  `</a:fmtScheme>`;

export const THEME_XML =
  XML_DECL +
  `<a:theme xmlns:a="${NS_A}" name="PYQ Vault">` +
  `<a:themeElements>${COLOR_SCHEME}${FONT_SCHEME}${FMT_SCHEME}</a:themeElements>` +
  `<a:objectDefaults/><a:extraClrSchemeLst/>` +
  `</a:theme>`;

export const PRES_PROPS_XML =
  XML_DECL + `<p:presentationPr xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}"/>`;

export const VIEW_PROPS_XML =
  XML_DECL + `<p:viewPr xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}"/>`;

export const TABLE_STYLES_XML =
  XML_DECL + `<a:tblStyleLst xmlns:a="${NS_A}" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`;

export function corePropsXml(title: string): string {
  return (
    XML_DECL +
    `<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ` +
    `xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ` +
    `xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">` +
    `<dc:title>${title}</dc:title>` +
    `<dc:creator>PYQ Vault</dc:creator>` +
    `<cp:lastModifiedBy>PYQ Vault</cp:lastModifiedBy>` +
    `</cp:coreProperties>`
  );
}

export function appPropsXml(slideCount: number): string {
  return (
    XML_DECL +
    `<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" ` +
    `xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">` +
    `<Application>PYQ Vault</Application>` +
    `<Slides>${slideCount}</Slides>` +
    `</Properties>`
  );
}
