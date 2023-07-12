import { __ } from '@wordpress/i18n';

export const DEFAULT_DATA = {
    info_details: {
        theme_version: '1.0.0',
        wp_min_version: '6.2',
        wp_tested_version: '6.2',
        php_version: '7.4.21',
        core_content_width: '1140px',
        core_wide_width: '1200px',
    }
};

export const CATEGORIES = [
    {
        id: 'core',
        name: __('Core Templates', 'gtb')
    },
    {
        id: 'gutenverse',
        name: __('Gutenverse Templates', 'gtb')
    },
    {
        id: 'pro',
        name: __('Gutenverse PRO Templates', 'gtb')
    }
];

export const TEMPLATE_TYPES = [
    {
        value: 'index',
        label: __('Index', 'gtb')
    },
    {
        value: 'front-page',
        label: __('Front Page', 'gtb')
    },
    {
        value: 'home',
        label: __('Home', 'gtb')
    },
    {
        value: 'page',
        label: __('Page', 'gtb')
    },
    {
        value: 'single',
        label: __('Single', 'gtb')
    },
    {
        value: 'archive',
        label: __('Archive', 'gtb')
    },
    {
        value: 'author',
        label: __('Author', 'gtb')
    },
    {
        value: 'category',
        label: __('Category', 'gtb')
    },
    {
        value: 'date',
        label: __('Date', 'gtb')
    },
    {
        value: 'tag',
        label: __('Tag', 'gtb')
    },
    {
        value: 'taxonomy',
        label: __('Taxonomy', 'gtb')
    },
    {
        value: 'search',
        label: __('Search', 'gtb')
    },
    {
        value: '404',
        label: __('404', 'gtb')
    },
    {
        value: 'custom_template',
        label: __('Custom Template', 'gtb')
    },
    {
        value: 'header',
        label: __('Header', 'gtb')
    },
    {
        value: 'footer',
        label: __('Footer', 'gtb')
    },
    {
        value: 'template_part',
        label: __('Template Part', 'gtb')
    }
];

export const NAMABLE_TEMPLATES = [
    'custom_template',
    'header',
    'footer',
    'template_part',
];

export const THEME_MODE = [
    {
        value: 'core-gutenverse',
        label: 'Core and Gutenverse'
    },
    {
        value: 'gutenverse-pro',
        label: 'Gutenverse and PRO version'
    },
    {
        value: 'core-only',
        label: 'Core Only'
    },
    {
        value: 'gutenverse-only',
        label: 'Gutenverse Only'
    },
    {
        value: 'pro-only',
        label: 'Pro Only'
    },
];

export const TAGS = [
    {
        value: 'grid-layout',
        label: 'grid-layout'
    },
    {
        value: 'one-column',
        label: 'one-column'
    },
    {
        value: 'two-columns',
        label: 'two-columns'
    },
    {
        value: 'three-columns',
        label: 'three-columns'
    },
    {
        value: 'four-columns',
        label: 'four-columns'
    },
    {
        value: 'left-sidebar',
        label: 'left-sidebar'
    },
    {
        value: 'right-sidebar',
        label: 'right-sidebar'
    },
    {
        value: 'wide-blocks',
        label: 'wide-blocks'
    },
    {
        value: 'accessibility-ready',
        label: 'accessibility-ready'
    },
    {
        value: 'block-patterns',
        label: 'block-patterns'
    },
    {
        value: 'block-styles',
        label: 'block-styles'
    },
    {
        value: 'buddypress',
        label: 'buddypress'
    },
    {
        value: 'custom-background',
        label: 'custom-background'
    },
    {
        value: 'custom-colors',
        label: 'custom-colors'
    },
    {
        value: 'custom-header',
        label: 'custom-header'
    },
    {
        value: 'custom-logo',
        label: 'custom-logo'
    },
    {
        value: 'custom-menu',
        label: 'custom-menu'
    },
    {
        value: 'editor-style',
        label: 'editor-style'
    },
    {
        value: 'featured-image-header',
        label: 'featured-image-header'
    },
    {
        value: 'featured-images',
        label: 'featured-images'
    },
    {
        value: 'flexible-header',
        label: 'flexible-header'
    },
    {
        value: 'footer-widgets',
        label: 'footer-widgets'
    },
    {
        value: 'front-page-post-form',
        label: 'front-page-post-form'
    },
    {
        value: 'full-site-editing',
        label: 'full-site-editing'
    },
    {
        value: 'full-width-template',
        label: 'full-width-template'
    },
    {
        value: 'microformats',
        label: 'microformats'
    },
    {
        value: 'post-formats',
        label: 'post-formats'
    },
    {
        value: 'rtl-language-support',
        label: 'rtl-language-support'
    },
    {
        value: 'sticky-post',
        label: 'sticky-post'
    },
    {
        value: 'style-variations',
        label: 'style-variations'
    },
    {
        value: 'template-editing',
        label: 'template-editing'
    },
    {
        value: 'theme-options',
        label: 'theme-options'
    },
    {
        value: 'threaded-comments',
        label: 'threaded-comments'
    },
    {
        value: 'translation-ready',
        label: 'translation-ready'
    },
    {
        value: 'blog',
        label: 'blog'
    },
    {
        value: 'e-commerce',
        label: 'e-commerce'
    },
    {
        value: 'education',
        label: 'education'
    },
    {
        value: 'entertainment',
        label: 'entertainment'
    },
    {
        value: 'food-and-drink',
        label: 'food-and-drink'
    },
    {
        value: 'holiday',
        label: 'holiday'
    },
    {
        value: 'news',
        label: 'news'
    },
    {
        value: 'photography',
        label: 'photography'
    },
    {
        value: 'portfolio',
        label: 'portfolio'
    },
];

export const FONT_FAMILIES = [
    {
        value: 'ABeeZee',
        label: 'ABeeZee'
    },
    {
        value: 'Abel',
        label: 'Abel'
    },
    {
        value: 'Abhaya Libre',
        label: 'Abhaya Libre'
    },
    {
        value: 'Abril Fatface',
        label: 'Abril Fatface'
    },
    {
        value: 'Aclonica',
        label: 'Aclonica'
    },
    {
        value: 'Acme',
        label: 'Acme'
    },
    {
        value: 'Actor',
        label: 'Actor'
    },
    {
        value: 'Adamina',
        label: 'Adamina'
    },
    {
        value: 'Advent Pro',
        label: 'Advent Pro'
    },
    {
        value: 'Aguafina Script',
        label: 'Aguafina Script'
    },
    {
        value: 'Akronim',
        label: 'Akronim'
    },
    {
        value: 'Aladin',
        label: 'Aladin'
    },
    {
        value: 'Aldrich',
        label: 'Aldrich'
    },
    {
        value: 'Alef',
        label: 'Alef'
    },
    {
        value: 'Alegreya',
        label: 'Alegreya'
    },
    {
        value: 'Alegreya SC',
        label: 'Alegreya SC'
    },
    {
        value: 'Alegreya Sans',
        label: 'Alegreya Sans'
    },
    {
        value: 'Alegreya Sans SC',
        label: 'Alegreya Sans SC'
    },
    {
        value: 'Alex Brush',
        label: 'Alex Brush'
    },
    {
        value: 'Alfa Slab One',
        label: 'Alfa Slab One'
    },
    {
        value: 'Alice',
        label: 'Alice'
    },
    {
        value: 'Alike',
        label: 'Alike'
    },
    {
        value: 'Alike Angular',
        label: 'Alike Angular'
    },
    {
        value: 'Allan',
        label: 'Allan'
    },
    {
        value: 'Allerta',
        label: 'Allerta'
    },
    {
        value: 'Allerta Stencil',
        label: 'Allerta Stencil'
    },
    {
        value: 'Allura',
        label: 'Allura'
    },
    {
        value: 'Almendra',
        label: 'Almendra'
    },
    {
        value: 'Almendra Display',
        label: 'Almendra Display'
    },
    {
        value: 'Almendra SC',
        label: 'Almendra SC'
    },
    {
        value: 'Amarante',
        label: 'Amarante'
    },
    {
        value: 'Amaranth',
        label: 'Amaranth'
    },
    {
        value: 'Amatic SC',
        label: 'Amatic SC'
    },
    {
        value: 'Amethysta',
        label: 'Amethysta'
    },
    {
        value: 'Amiko',
        label: 'Amiko'
    },
    {
        value: 'Amiri',
        label: 'Amiri'
    },
    {
        value: 'Amita',
        label: 'Amita'
    },
    {
        value: 'Anaheim',
        label: 'Anaheim'
    },
    {
        value: 'Andada',
        label: 'Andada'
    },
    {
        value: 'Andika',
        label: 'Andika'
    },
    {
        value: 'Angkor',
        label: 'Angkor'
    },
    {
        value: 'Annie Use Your Telescope',
        label: 'Annie Use Your Telescope'
    },
    {
        value: 'Anonymous Pro',
        label: 'Anonymous Pro'
    },
    {
        value: 'Antic',
        label: 'Antic'
    },
    {
        value: 'Antic Didone',
        label: 'Antic Didone'
    },
    {
        value: 'Antic Slab',
        label: 'Antic Slab'
    },
    {
        value: 'Anton',
        label: 'Anton'
    },
    {
        value: 'Arapey',
        label: 'Arapey'
    },
    {
        value: 'Arbutus',
        label: 'Arbutus'
    },
    {
        value: 'Arbutus Slab',
        label: 'Arbutus Slab'
    },
    {
        value: 'Architects Daughter',
        label: 'Architects Daughter'
    },
    {
        value: 'Archivo',
        label: 'Archivo'
    },
    {
        value: 'Archivo Black',
        label: 'Archivo Black'
    },
    {
        value: 'Archivo Narrow',
        label: 'Archivo Narrow'
    },
    {
        value: 'Aref Ruqaa',
        label: 'Aref Ruqaa'
    },
    {
        value: 'Arima Madurai',
        label: 'Arima Madurai'
    },
    {
        value: 'Arimo',
        label: 'Arimo'
    },
    {
        value: 'Arizonia',
        label: 'Arizonia'
    },
    {
        value: 'Armata',
        label: 'Armata'
    },
    {
        value: 'Arsenal',
        label: 'Arsenal'
    },
    {
        value: 'Artifika',
        label: 'Artifika'
    },
    {
        value: 'Arvo',
        label: 'Arvo'
    },
    {
        value: 'Arya',
        label: 'Arya'
    },
    {
        value: 'Asap',
        label: 'Asap'
    },
    {
        value: 'Asap Condensed',
        label: 'Asap Condensed'
    },
    {
        value: 'Asar',
        label: 'Asar'
    },
    {
        value: 'Asset',
        label: 'Asset'
    },
    {
        value: 'Assistant',
        label: 'Assistant'
    },
    {
        value: 'Astloch',
        label: 'Astloch'
    },
    {
        value: 'Asul',
        label: 'Asul'
    },
    {
        value: 'Athiti',
        label: 'Athiti'
    },
    {
        value: 'Atma',
        label: 'Atma'
    },
    {
        value: 'Atomic Age',
        label: 'Atomic Age'
    },
    {
        value: 'Aubrey',
        label: 'Aubrey'
    },
    {
        value: 'Audiowide',
        label: 'Audiowide'
    },
    {
        value: 'Autour One',
        label: 'Autour One'
    },
    {
        value: 'Average',
        label: 'Average'
    },
    {
        value: 'Average Sans',
        label: 'Average Sans'
    },
    {
        value: 'Averia Gruesa Libre',
        label: 'Averia Gruesa Libre'
    },
    {
        value: 'Averia Libre',
        label: 'Averia Libre'
    },
    {
        value: 'Averia Sans Libre',
        label: 'Averia Sans Libre'
    },
    {
        value: 'Averia Serif Libre',
        label: 'Averia Serif Libre'
    },
    {
        value: 'Bad Script',
        label: 'Bad Script'
    },
    {
        value: 'Bahiana',
        label: 'Bahiana'
    },
    {
        value: 'Bai Jamjuree',
        label: 'Bai Jamjuree'
    },
    {
        value: 'Baloo',
        label: 'Baloo'
    },
    {
        value: 'Baloo Bhai',
        label: 'Baloo Bhai'
    },
    {
        value: 'Baloo Bhaijaan',
        label: 'Baloo Bhaijaan'
    },
    {
        value: 'Baloo Bhaina',
        label: 'Baloo Bhaina'
    },
    {
        value: 'Baloo Chettan',
        label: 'Baloo Chettan'
    },
    {
        value: 'Baloo Da',
        label: 'Baloo Da'
    },
    {
        value: 'Baloo Paaji',
        label: 'Baloo Paaji'
    },
    {
        value: 'Baloo Tamma',
        label: 'Baloo Tamma'
    },
    {
        value: 'Baloo Tammudu',
        label: 'Baloo Tammudu'
    },
    {
        value: 'Baloo Thambi',
        label: 'Baloo Thambi'
    },
    {
        value: 'Balthazar',
        label: 'Balthazar'
    },
    {
        value: 'Bangers',
        label: 'Bangers'
    },
    {
        value: 'Barlow',
        label: 'Barlow'
    },
    {
        value: 'Barlow Condensed',
        label: 'Barlow Condensed'
    },
    {
        value: 'Barlow Semi Condensed',
        label: 'Barlow Semi Condensed'
    },
    {
        value: 'Barrio',
        label: 'Barrio'
    },
    {
        value: 'Basic',
        label: 'Basic'
    },
    {
        value: 'Battambang',
        label: 'Battambang'
    },
    {
        value: 'Baumans',
        label: 'Baumans'
    },
    {
        value: 'Bayon',
        label: 'Bayon'
    },
    {
        value: 'Belgrano',
        label: 'Belgrano'
    },
    {
        value: 'Bellefair',
        label: 'Bellefair'
    },
    {
        value: 'Belleza',
        label: 'Belleza'
    },
    {
        value: 'BenchNine',
        label: 'BenchNine'
    },
    {
        value: 'Bentham',
        label: 'Bentham'
    },
    {
        value: 'Berkshire Swash',
        label: 'Berkshire Swash'
    },
    {
        value: 'Bevan',
        label: 'Bevan'
    },
    {
        value: 'Bigelow Rules',
        label: 'Bigelow Rules'
    },
    {
        value: 'Bigshot One',
        label: 'Bigshot One'
    },
    {
        value: 'Bilbo',
        label: 'Bilbo'
    },
    {
        value: 'Bilbo Swash Caps',
        label: 'Bilbo Swash Caps'
    },
    {
        value: 'BioRhyme',
        label: 'BioRhyme'
    },
    {
        value: 'BioRhyme Expanded',
        label: 'BioRhyme Expanded'
    },
    {
        value: 'Biryani',
        label: 'Biryani'
    },
    {
        value: 'Bitter',
        label: 'Bitter'
    },
    {
        value: 'Black And White Picture',
        label: 'Black And White Picture'
    },
    {
        value: 'Black Han Sans',
        label: 'Black Han Sans'
    },
    {
        value: 'Black Ops One',
        label: 'Black Ops One'
    },
    {
        value: 'Bokor',
        label: 'Bokor'
    },
    {
        value: 'Bonbon',
        label: 'Bonbon'
    },
    {
        value: 'Boogaloo',
        label: 'Boogaloo'
    },
    {
        value: 'Bowlby One',
        label: 'Bowlby One'
    },
    {
        value: 'Bowlby One SC',
        label: 'Bowlby One SC'
    },
    {
        value: 'Brawler',
        label: 'Brawler'
    },
    {
        value: 'Bree Serif',
        label: 'Bree Serif'
    },
    {
        value: 'Bubblegum Sans',
        label: 'Bubblegum Sans'
    },
    {
        value: 'Bubbler One',
        label: 'Bubbler One'
    },
    {
        value: 'Buda',
        label: 'Buda'
    },
    {
        value: 'Buenard',
        label: 'Buenard'
    },
    {
        value: 'Bungee',
        label: 'Bungee'
    },
    {
        value: 'Bungee Hairline',
        label: 'Bungee Hairline'
    },
    {
        value: 'Bungee Inline',
        label: 'Bungee Inline'
    },
    {
        value: 'Bungee Outline',
        label: 'Bungee Outline'
    },
    {
        value: 'Bungee Shade',
        label: 'Bungee Shade'
    },
    {
        value: 'Butcherman',
        label: 'Butcherman'
    },
    {
        value: 'Butterfly Kids',
        label: 'Butterfly Kids'
    },
    {
        value: 'Cabin',
        label: 'Cabin'
    },
    {
        value: 'Cabin Condensed',
        label: 'Cabin Condensed'
    },
    {
        value: 'Cabin Sketch',
        label: 'Cabin Sketch'
    },
    {
        value: 'Caesar Dressing',
        label: 'Caesar Dressing'
    },
    {
        value: 'Cagliostro',
        label: 'Cagliostro'
    },
    {
        value: 'Cairo',
        label: 'Cairo'
    },
    {
        value: 'Calligraffitti',
        label: 'Calligraffitti'
    },
    {
        value: 'Cambay',
        label: 'Cambay'
    },
    {
        value: 'Cambo',
        label: 'Cambo'
    },
    {
        value: 'Candal',
        label: 'Candal'
    },
    {
        value: 'Cantarell',
        label: 'Cantarell'
    },
    {
        value: 'Cantata One',
        label: 'Cantata One'
    },
    {
        value: 'Cantora One',
        label: 'Cantora One'
    },
    {
        value: 'Capriola',
        label: 'Capriola'
    },
    {
        value: 'Cardo',
        label: 'Cardo'
    },
    {
        value: 'Carme',
        label: 'Carme'
    },
    {
        value: 'Carrois Gothic',
        label: 'Carrois Gothic'
    },
    {
        value: 'Carrois Gothic SC',
        label: 'Carrois Gothic SC'
    },
    {
        value: 'Carter One',
        label: 'Carter One'
    },
    {
        value: 'Catamaran',
        label: 'Catamaran'
    },
    {
        value: 'Caudex',
        label: 'Caudex'
    },
    {
        value: 'Caveat',
        label: 'Caveat'
    },
    {
        value: 'Caveat Brush',
        label: 'Caveat Brush'
    },
    {
        value: 'Cedarville Cursive',
        label: 'Cedarville Cursive'
    },
    {
        value: 'Ceviche One',
        label: 'Ceviche One'
    },
    {
        value: 'Chakra Petch',
        label: 'Chakra Petch'
    },
    {
        value: 'Changa',
        label: 'Changa'
    },
    {
        value: 'Changa One',
        label: 'Changa One'
    },
    {
        value: 'Chango',
        label: 'Chango'
    },
    {
        value: 'Charmonman',
        label: 'Charmonman'
    },
    {
        value: 'Chathura',
        label: 'Chathura'
    },
    {
        value: 'Chau Philomene One',
        label: 'Chau Philomene One'
    },
    {
        value: 'Chela One',
        label: 'Chela One'
    },
    {
        value: 'Chelsea Market',
        label: 'Chelsea Market'
    },
    {
        value: 'Chenla',
        label: 'Chenla'
    },
    {
        value: 'Cherry Cream Soda',
        label: 'Cherry Cream Soda'
    },
    {
        value: 'Cherry Swash',
        label: 'Cherry Swash'
    },
    {
        value: 'Chewy',
        label: 'Chewy'
    },
    {
        value: 'Chicle',
        label: 'Chicle'
    },
    {
        value: 'Chivo',
        label: 'Chivo'
    },
    {
        value: 'Chonburi',
        label: 'Chonburi'
    },
    {
        value: 'Cinzel',
        label: 'Cinzel'
    },
    {
        value: 'Cinzel Decorative',
        label: 'Cinzel Decorative'
    },
    {
        value: 'Clicker Script',
        label: 'Clicker Script'
    },
    {
        value: 'Coda',
        label: 'Coda'
    },
    {
        value: 'Coda Caption',
        label: 'Coda Caption'
    },
    {
        value: 'Codystar',
        label: 'Codystar'
    },
    {
        value: 'Coiny',
        label: 'Coiny'
    },
    {
        value: 'Combo',
        label: 'Combo'
    },
    {
        value: 'Comfortaa',
        label: 'Comfortaa'
    },
    {
        value: 'Coming Soon',
        label: 'Coming Soon'
    },
    {
        value: 'Concert One',
        label: 'Concert One'
    },
    {
        value: 'Condiment',
        label: 'Condiment'
    },
    {
        value: 'Content',
        label: 'Content'
    },
    {
        value: 'Contrail One',
        label: 'Contrail One'
    },
    {
        value: 'Convergence',
        label: 'Convergence'
    },
    {
        value: 'Cookie',
        label: 'Cookie'
    },
    {
        value: 'Copse',
        label: 'Copse'
    },
    {
        value: 'Corben',
        label: 'Corben'
    },
    {
        value: 'Cormorant',
        label: 'Cormorant'
    },
    {
        value: 'Cormorant Garamond',
        label: 'Cormorant Garamond'
    },
    {
        value: 'Cormorant Infant',
        label: 'Cormorant Infant'
    },
    {
        value: 'Cormorant SC',
        label: 'Cormorant SC'
    },
    {
        value: 'Cormorant Unicase',
        label: 'Cormorant Unicase'
    },
    {
        value: 'Cormorant Upright',
        label: 'Cormorant Upright'
    },
    {
        value: 'Courgette',
        label: 'Courgette'
    },
    {
        value: 'Cousine',
        label: 'Cousine'
    },
    {
        value: 'Coustard',
        label: 'Coustard'
    },
    {
        value: 'Covered By Your Grace',
        label: 'Covered By Your Grace'
    },
    {
        value: 'Crafty Girls',
        label: 'Crafty Girls'
    },
    {
        value: 'Creepster',
        label: 'Creepster'
    },
    {
        value: 'Crete Round',
        label: 'Crete Round'
    },
    {
        value: 'Crimson Text',
        label: 'Crimson Text'
    },
    {
        value: 'Croissant One',
        label: 'Croissant One'
    },
    {
        value: 'Crushed',
        label: 'Crushed'
    },
    {
        value: 'Cuprum',
        label: 'Cuprum'
    },
    {
        value: 'Cute Font',
        label: 'Cute Font'
    },
    {
        value: 'Cutive',
        label: 'Cutive'
    },
    {
        value: 'Cutive Mono',
        label: 'Cutive Mono'
    },
    {
        value: 'Damion',
        label: 'Damion'
    },
    {
        value: 'Dancing Script',
        label: 'Dancing Script'
    },
    {
        value: 'Dangrek',
        label: 'Dangrek'
    },
    {
        value: 'David Libre',
        label: 'David Libre'
    },
    {
        value: 'Dawning of a New Day',
        label: 'Dawning of a New Day'
    },
    {
        value: 'Days One',
        label: 'Days One'
    },
    {
        value: 'Dekko',
        label: 'Dekko'
    },
    {
        value: 'Delius',
        label: 'Delius'
    },
    {
        value: 'Delius Swash Caps',
        label: 'Delius Swash Caps'
    },
    {
        value: 'Delius Unicase',
        label: 'Delius Unicase'
    },
    {
        value: 'Della Respira',
        label: 'Della Respira'
    },
    {
        value: 'Denk One',
        label: 'Denk One'
    },
    {
        value: 'Devonshire',
        label: 'Devonshire'
    },
    {
        value: 'Dhurjati',
        label: 'Dhurjati'
    },
    {
        value: 'Didact Gothic',
        label: 'Didact Gothic'
    },
    {
        value: 'Diplomata',
        label: 'Diplomata'
    },
    {
        value: 'Diplomata SC',
        label: 'Diplomata SC'
    },
    {
        value: 'Do Hyeon',
        label: 'Do Hyeon'
    },
    {
        value: 'Dokdo',
        label: 'Dokdo'
    },
    {
        value: 'Domine',
        label: 'Domine'
    },
    {
        value: 'Donegal One',
        label: 'Donegal One'
    },
    {
        value: 'Doppio One',
        label: 'Doppio One'
    },
    {
        value: 'Dorsa',
        label: 'Dorsa'
    },
    {
        value: 'Dosis',
        label: 'Dosis'
    },
    {
        value: 'Dr Sugiyama',
        label: 'Dr Sugiyama'
    },
    {
        value: 'Duru Sans',
        label: 'Duru Sans'
    },
    {
        value: 'Dynalight',
        label: 'Dynalight'
    },
    {
        value: 'EB Garamond',
        label: 'EB Garamond'
    },
    {
        value: 'Eagle Lake',
        label: 'Eagle Lake'
    },
    {
        value: 'East Sea Dokdo',
        label: 'East Sea Dokdo'
    },
    {
        value: 'Eater',
        label: 'Eater'
    },
    {
        value: 'Economica',
        label: 'Economica'
    },
    {
        value: 'Eczar',
        label: 'Eczar'
    },
    {
        value: 'El Messiri',
        label: 'El Messiri'
    },
    {
        value: 'Electrolize',
        label: 'Electrolize'
    },
    {
        value: 'Elsie',
        label: 'Elsie'
    },
    {
        value: 'Elsie Swash Caps',
        label: 'Elsie Swash Caps'
    },
    {
        value: 'Emblema One',
        label: 'Emblema One'
    },
    {
        value: 'Emilys Candy',
        label: 'Emilys Candy'
    },
    {
        value: 'Encode Sans',
        label: 'Encode Sans'
    },
    {
        value: 'Encode Sans Condensed',
        label: 'Encode Sans Condensed'
    },
    {
        value: 'Encode Sans Expanded',
        label: 'Encode Sans Expanded'
    },
    {
        value: 'Encode Sans Semi Condensed',
        label: 'Encode Sans Semi Condensed'
    },
    {
        value: 'Encode Sans Semi Expanded',
        label: 'Encode Sans Semi Expanded'
    },
    {
        value: 'Engagement',
        label: 'Engagement'
    },
    {
        value: 'Englebert',
        label: 'Englebert'
    },
    {
        value: 'Enriqueta',
        label: 'Enriqueta'
    },
    {
        value: 'Erica One',
        label: 'Erica One'
    },
    {
        value: 'Esteban',
        label: 'Esteban'
    },
    {
        value: 'Euphoria Script',
        label: 'Euphoria Script'
    },
    {
        value: 'Ewert',
        label: 'Ewert'
    },
    {
        value: 'Exo',
        label: 'Exo'
    },
    {
        value: 'Exo 2',
        label: 'Exo 2'
    },
    {
        value: 'Expletus Sans',
        label: 'Expletus Sans'
    },
    {
        value: 'Fahkwang',
        label: 'Fahkwang'
    },
    {
        value: 'Fanwood Text',
        label: 'Fanwood Text'
    },
    {
        value: 'Farsan',
        label: 'Farsan'
    },
    {
        value: 'Fascinate',
        label: 'Fascinate'
    },
    {
        value: 'Fascinate Inline',
        label: 'Fascinate Inline'
    },
    {
        value: 'Faster One',
        label: 'Faster One'
    },
    {
        value: 'Fasthand',
        label: 'Fasthand'
    },
    {
        value: 'Fauna One',
        label: 'Fauna One'
    },
    {
        value: 'Faustina',
        label: 'Faustina'
    },
    {
        value: 'Federant',
        label: 'Federant'
    },
    {
        value: 'Federo',
        label: 'Federo'
    },
    {
        value: 'Felipa',
        label: 'Felipa'
    },
    {
        value: 'Fenix',
        label: 'Fenix'
    },
    {
        value: 'Finger Paint',
        label: 'Finger Paint'
    },
    {
        value: 'Fira Mono',
        label: 'Fira Mono'
    },
    {
        value: 'Fira Sans',
        label: 'Fira Sans'
    },
    {
        value: 'Fira Sans Condensed',
        label: 'Fira Sans Condensed'
    },
    {
        value: 'Fira Sans Extra Condensed',
        label: 'Fira Sans Extra Condensed'
    },
    {
        value: 'Fjalla One',
        label: 'Fjalla One'
    },
    {
        value: 'Fjord One',
        label: 'Fjord One'
    },
    {
        value: 'Flamenco',
        label: 'Flamenco'
    },
    {
        value: 'Flavors',
        label: 'Flavors'
    },
    {
        value: 'Fondamento',
        label: 'Fondamento'
    },
    {
        value: 'Fontdiner Swanky',
        label: 'Fontdiner Swanky'
    },
    {
        value: 'Forum',
        label: 'Forum'
    },
    {
        value: 'Francois One',
        label: 'Francois One'
    },
    {
        value: 'Frank Ruhl Libre',
        label: 'Frank Ruhl Libre'
    },
    {
        value: 'Freckle Face',
        label: 'Freckle Face'
    },
    {
        value: 'Fredericka the Great',
        label: 'Fredericka the Great'
    },
    {
        value: 'Fredoka One',
        label: 'Fredoka One'
    },
    {
        value: 'Freehand',
        label: 'Freehand'
    },
    {
        value: 'Fresca',
        label: 'Fresca'
    },
    {
        value: 'Frijole',
        label: 'Frijole'
    },
    {
        value: 'Fruktur',
        label: 'Fruktur'
    },
    {
        value: 'Fugaz One',
        label: 'Fugaz One'
    },
    {
        value: 'GFS Didot',
        label: 'GFS Didot'
    },
    {
        value: 'GFS Neohellenic',
        label: 'GFS Neohellenic'
    },
    {
        value: 'Gabriela',
        label: 'Gabriela'
    },
    {
        value: 'Gaegu',
        label: 'Gaegu'
    },
    {
        value: 'Gafata',
        label: 'Gafata'
    },
    {
        value: 'Galada',
        label: 'Galada'
    },
    {
        value: 'Galdeano',
        label: 'Galdeano'
    },
    {
        value: 'Galindo',
        label: 'Galindo'
    },
    {
        value: 'Gamja Flower',
        label: 'Gamja Flower'
    },
    {
        value: 'Gentium Basic',
        label: 'Gentium Basic'
    },
    {
        value: 'Gentium Book Basic',
        label: 'Gentium Book Basic'
    },
    {
        value: 'Geo',
        label: 'Geo'
    },
    {
        value: 'Geostar',
        label: 'Geostar'
    },
    {
        value: 'Geostar Fill',
        label: 'Geostar Fill'
    },
    {
        value: 'Germania One',
        label: 'Germania One'
    },
    {
        value: 'Gidugu',
        label: 'Gidugu'
    },
    {
        value: 'Gilda Display',
        label: 'Gilda Display'
    },
    {
        value: 'Give You Glory',
        label: 'Give You Glory'
    },
    {
        value: 'Glass Antiqua',
        label: 'Glass Antiqua'
    },
    {
        value: 'Glegoo',
        label: 'Glegoo'
    },
    {
        value: 'Gloria Hallelujah',
        label: 'Gloria Hallelujah'
    },
    {
        value: 'Goblin One',
        label: 'Goblin One'
    },
    {
        value: 'Gochi Hand',
        label: 'Gochi Hand'
    },
    {
        value: 'Gorditas',
        label: 'Gorditas'
    },
    {
        value: 'Gothic A1',
        label: 'Gothic A1'
    },
    {
        value: 'Goudy Bookletter 1911',
        label: 'Goudy Bookletter 1911'
    },
    {
        value: 'Graduate',
        label: 'Graduate'
    },
    {
        value: 'Grand Hotel',
        label: 'Grand Hotel'
    },
    {
        value: 'Gravitas One',
        label: 'Gravitas One'
    },
    {
        value: 'Great Vibes',
        label: 'Great Vibes'
    },
    {
        value: 'Griffy',
        label: 'Griffy'
    },
    {
        value: 'Gruppo',
        label: 'Gruppo'
    },
    {
        value: 'Gudea',
        label: 'Gudea'
    },
    {
        value: 'Gugi',
        label: 'Gugi'
    },
    {
        value: 'Gurajada',
        label: 'Gurajada'
    },
    {
        value: 'Habibi',
        label: 'Habibi'
    },
    {
        value: 'Halant',
        label: 'Halant'
    },
    {
        value: 'Hammersmith One',
        label: 'Hammersmith One'
    },
    {
        value: 'Hanalei',
        label: 'Hanalei'
    },
    {
        value: 'Hanalei Fill',
        label: 'Hanalei Fill'
    },
    {
        value: 'Handlee',
        label: 'Handlee'
    },
    {
        value: 'Hanuman',
        label: 'Hanuman'
    },
    {
        value: 'Happy Monkey',
        label: 'Happy Monkey'
    },
    {
        value: 'Harmattan',
        label: 'Harmattan'
    },
    {
        value: 'Headland One',
        label: 'Headland One'
    },
    {
        value: 'Heebo',
        label: 'Heebo'
    },
    {
        value: 'Henny Penny',
        label: 'Henny Penny'
    },
    {
        value: 'Herr Von Muellerhoff',
        label: 'Herr Von Muellerhoff'
    },
    {
        value: 'Hi Melody',
        label: 'Hi Melody'
    },
    {
        value: 'Hind',
        label: 'Hind'
    },
    {
        value: 'Hind Guntur',
        label: 'Hind Guntur'
    },
    {
        value: 'Hind Madurai',
        label: 'Hind Madurai'
    },
    {
        value: 'Hind Siliguri',
        label: 'Hind Siliguri'
    },
    {
        value: 'Hind Vadodara',
        label: 'Hind Vadodara'
    },
    {
        value: 'Holtwood One SC',
        label: 'Holtwood One SC'
    },
    {
        value: 'Homemade Apple',
        label: 'Homemade Apple'
    },
    {
        value: 'Homenaje',
        label: 'Homenaje'
    },
    {
        value: 'IBM Plex Mono',
        label: 'IBM Plex Mono'
    },
    {
        value: 'IBM Plex Sans',
        label: 'IBM Plex Sans'
    },
    {
        value: 'IBM Plex Sans Condensed',
        label: 'IBM Plex Sans Condensed'
    },
    {
        value: 'IBM Plex Serif',
        label: 'IBM Plex Serif'
    },
    {
        value: 'IM Fell DW Pica',
        label: 'IM Fell DW Pica'
    },
    {
        value: 'IM Fell DW Pica SC',
        label: 'IM Fell DW Pica SC'
    },
    {
        value: 'IM Fell Double Pica',
        label: 'IM Fell Double Pica'
    },
    {
        value: 'IM Fell Double Pica SC',
        label: 'IM Fell Double Pica SC'
    },
    {
        value: 'IM Fell English',
        label: 'IM Fell English'
    },
    {
        value: 'IM Fell English SC',
        label: 'IM Fell English SC'
    },
    {
        value: 'IM Fell French Canon',
        label: 'IM Fell French Canon'
    },
    {
        value: 'IM Fell French Canon SC',
        label: 'IM Fell French Canon SC'
    },
    {
        value: 'IM Fell Great Primer',
        label: 'IM Fell Great Primer'
    },
    {
        value: 'IM Fell Great Primer SC',
        label: 'IM Fell Great Primer SC'
    },
    {
        value: 'Iceberg',
        label: 'Iceberg'
    },
    {
        value: 'Iceland',
        label: 'Iceland'
    },
    {
        value: 'Imprima',
        label: 'Imprima'
    },
    {
        value: 'Inconsolata',
        label: 'Inconsolata'
    },
    {
        value: 'Inder',
        label: 'Inder'
    },
    {
        value: 'Indie Flower',
        label: 'Indie Flower'
    },
    {
        value: 'Inika',
        label: 'Inika'
    },
    {
        value: 'Inknut Antiqua',
        label: 'Inknut Antiqua'
    },
    {
        value: 'Irish Grover',
        label: 'Irish Grover'
    },
    {
        value: 'Istok Web',
        label: 'Istok Web'
    },
    {
        value: 'Italiana',
        label: 'Italiana'
    },
    {
        value: 'Italianno',
        label: 'Italianno'
    },
    {
        value: 'Itim',
        label: 'Itim'
    },
    {
        value: 'Jacques Francois',
        label: 'Jacques Francois'
    },
    {
        value: 'Jacques Francois Shadow',
        label: 'Jacques Francois Shadow'
    },
    {
        value: 'Jaldi',
        label: 'Jaldi'
    },
    {
        value: 'Jim Nightshade',
        label: 'Jim Nightshade'
    },
    {
        value: 'Jockey One',
        label: 'Jockey One'
    },
    {
        value: 'Jolly Lodger',
        label: 'Jolly Lodger'
    },
    {
        value: 'Jomhuria',
        label: 'Jomhuria'
    },
    {
        value: 'Josefin Sans',
        label: 'Josefin Sans'
    },
    {
        value: 'Josefin Slab',
        label: 'Josefin Slab'
    },
    {
        value: 'Joti One',
        label: 'Joti One'
    },
    {
        value: 'Jua',
        label: 'Jua'
    },
    {
        value: 'Judson',
        label: 'Judson'
    },
    {
        value: 'Julee',
        label: 'Julee'
    },
    {
        value: 'Julius Sans One',
        label: 'Julius Sans One'
    },
    {
        value: 'Junge',
        label: 'Junge'
    },
    {
        value: 'Jura',
        label: 'Jura'
    },
    {
        value: 'Just Another Hand',
        label: 'Just Another Hand'
    },
    {
        value: 'Just Me Again Down Here',
        label: 'Just Me Again Down Here'
    },
    {
        value: 'K2D',
        label: 'K2D'
    },
    {
        value: 'Kadwa',
        label: 'Kadwa'
    },
    {
        value: 'Kalam',
        label: 'Kalam'
    },
    {
        value: 'Kameron',
        label: 'Kameron'
    },
    {
        value: 'Kanit',
        label: 'Kanit'
    },
    {
        value: 'Kantumruy',
        label: 'Kantumruy'
    },
    {
        value: 'Karla',
        label: 'Karla'
    },
    {
        value: 'Karma',
        label: 'Karma'
    },
    {
        value: 'Katibeh',
        label: 'Katibeh'
    },
    {
        value: 'Kaushan Script',
        label: 'Kaushan Script'
    },
    {
        value: 'Kavivanar',
        label: 'Kavivanar'
    },
    {
        value: 'Kavoon',
        label: 'Kavoon'
    },
    {
        value: 'Kdam Thmor',
        label: 'Kdam Thmor'
    },
    {
        value: 'Keania One',
        label: 'Keania One'
    },
    {
        value: 'Kelly Slab',
        label: 'Kelly Slab'
    },
    {
        value: 'Kenia',
        label: 'Kenia'
    },
    {
        value: 'Khand',
        label: 'Khand'
    },
    {
        value: 'Khmer',
        label: 'Khmer'
    },
    {
        value: 'Khula',
        label: 'Khula'
    },
    {
        value: 'Kirang Haerang',
        label: 'Kirang Haerang'
    },
    {
        value: 'Kite One',
        label: 'Kite One'
    },
    {
        value: 'Knewave',
        label: 'Knewave'
    },
    {
        value: 'KoHo',
        label: 'KoHo'
    },
    {
        value: 'Kodchasan',
        label: 'Kodchasan'
    },
    {
        value: 'Kosugi',
        label: 'Kosugi'
    },
    {
        value: 'Kosugi Maru',
        label: 'Kosugi Maru'
    },
    {
        value: 'Kotta One',
        label: 'Kotta One'
    },
    {
        value: 'Koulen',
        label: 'Koulen'
    },
    {
        value: 'Kranky',
        label: 'Kranky'
    },
    {
        value: 'Kreon',
        label: 'Kreon'
    },
    {
        value: 'Kristi',
        label: 'Kristi'
    },
    {
        value: 'Krona One',
        label: 'Krona One'
    },
    {
        value: 'Krub',
        label: 'Krub'
    },
    {
        value: 'Kumar One',
        label: 'Kumar One'
    },
    {
        value: 'Kumar One Outline',
        label: 'Kumar One Outline'
    },
    {
        value: 'Kurale',
        label: 'Kurale'
    },
    {
        value: 'La Belle Aurore',
        label: 'La Belle Aurore'
    },
    {
        value: 'Laila',
        label: 'Laila'
    },
    {
        value: 'Lakki Reddy',
        label: 'Lakki Reddy'
    },
    {
        value: 'Lalezar',
        label: 'Lalezar'
    },
    {
        value: 'Lancelot',
        label: 'Lancelot'
    },
    {
        value: 'Lateef',
        label: 'Lateef'
    },
    {
        value: 'Lato',
        label: 'Lato'
    },
    {
        value: 'League Script',
        label: 'League Script'
    },
    {
        value: 'Leckerli One',
        label: 'Leckerli One'
    },
    {
        value: 'Ledger',
        label: 'Ledger'
    },
    {
        value: 'Lekton',
        label: 'Lekton'
    },
    {
        value: 'Lemon',
        label: 'Lemon'
    },
    {
        value: 'Lemonada',
        label: 'Lemonada'
    },
    {
        value: 'Libre Barcode 128',
        label: 'Libre Barcode 128'
    },
    {
        value: 'Libre Barcode 128 Text',
        label: 'Libre Barcode 128 Text'
    },
    {
        value: 'Libre Barcode 39',
        label: 'Libre Barcode 39'
    },
    {
        value: 'Libre Barcode 39 Extended',
        label: 'Libre Barcode 39 Extended'
    },
    {
        value: 'Libre Barcode 39 Extended Text',
        label: 'Libre Barcode 39 Extended Text'
    },
    {
        value: 'Libre Barcode 39 Text',
        label: 'Libre Barcode 39 Text'
    },
    {
        value: 'Libre Baskerville',
        label: 'Libre Baskerville'
    },
    {
        value: 'Libre Franklin',
        label: 'Libre Franklin'
    },
    {
        value: 'Life Savers',
        label: 'Life Savers'
    },
    {
        value: 'Lilita One',
        label: 'Lilita One'
    },
    {
        value: 'Lily Script One',
        label: 'Lily Script One'
    },
    {
        value: 'Limelight',
        label: 'Limelight'
    },
    {
        value: 'Linden Hill',
        label: 'Linden Hill'
    },
    {
        value: 'Lobster',
        label: 'Lobster'
    },
    {
        value: 'Lobster Two',
        label: 'Lobster Two'
    },
    {
        value: 'Londrina Outline',
        label: 'Londrina Outline'
    },
    {
        value: 'Londrina Shadow',
        label: 'Londrina Shadow'
    },
    {
        value: 'Londrina Sketch',
        label: 'Londrina Sketch'
    },
    {
        value: 'Londrina Solid',
        label: 'Londrina Solid'
    },
    {
        value: 'Lora',
        label: 'Lora'
    },
    {
        value: 'Love Ya Like A Sister',
        label: 'Love Ya Like A Sister'
    },
    {
        value: 'Loved by the King',
        label: 'Loved by the King'
    },
    {
        value: 'Lovers Quarrel',
        label: 'Lovers Quarrel'
    },
    {
        value: 'Luckiest Guy',
        label: 'Luckiest Guy'
    },
    {
        value: 'Lusitana',
        label: 'Lusitana'
    },
    {
        value: 'Lustria',
        label: 'Lustria'
    },
    {
        value: 'M PLUS 1p',
        label: 'M PLUS 1p'
    },
    {
        value: 'M PLUS Rounded 1c',
        label: 'M PLUS Rounded 1c'
    },
    {
        value: 'Macondo',
        label: 'Macondo'
    },
    {
        value: 'Macondo Swash Caps',
        label: 'Macondo Swash Caps'
    },
    {
        value: 'Mada',
        label: 'Mada'
    },
    {
        value: 'Magra',
        label: 'Magra'
    },
    {
        value: 'Maiden Orange',
        label: 'Maiden Orange'
    },
    {
        value: 'Maitree',
        label: 'Maitree'
    },
    {
        value: 'Mako',
        label: 'Mako'
    },
    {
        value: 'Mali',
        label: 'Mali'
    },
    {
        value: 'Mallanna',
        label: 'Mallanna'
    },
    {
        value: 'Mandali',
        label: 'Mandali'
    },
    {
        value: 'Manuale',
        label: 'Manuale'
    },
    {
        value: 'Marcellus',
        label: 'Marcellus'
    },
    {
        value: 'Marcellus SC',
        label: 'Marcellus SC'
    },
    {
        value: 'Marck Script',
        label: 'Marck Script'
    },
    {
        value: 'Margarine',
        label: 'Margarine'
    },
    {
        value: 'Markazi Text',
        label: 'Markazi Text'
    },
    {
        value: 'Marko One',
        label: 'Marko One'
    },
    {
        value: 'Marmelad',
        label: 'Marmelad'
    },
    {
        value: 'Martel',
        label: 'Martel'
    },
    {
        value: 'Martel Sans',
        label: 'Martel Sans'
    },
    {
        value: 'Marvel',
        label: 'Marvel'
    },
    {
        value: 'Mate',
        label: 'Mate'
    },
    {
        value: 'Mate SC',
        label: 'Mate SC'
    },
    {
        value: 'Maven Pro',
        label: 'Maven Pro'
    },
    {
        value: 'McLaren',
        label: 'McLaren'
    },
    {
        value: 'Meddon',
        label: 'Meddon'
    },
    {
        value: 'MedievalSharp',
        label: 'MedievalSharp'
    },
    {
        value: 'Medula One',
        label: 'Medula One'
    },
    {
        value: 'Meera Inimai',
        label: 'Meera Inimai'
    },
    {
        value: 'Megrim',
        label: 'Megrim'
    },
    {
        value: 'Meie Script',
        label: 'Meie Script'
    },
    {
        value: 'Merienda',
        label: 'Merienda'
    },
    {
        value: 'Merienda One',
        label: 'Merienda One'
    },
    {
        value: 'Merriweather',
        label: 'Merriweather'
    },
    {
        value: 'Merriweather Sans',
        label: 'Merriweather Sans'
    },
    {
        value: 'Metal',
        label: 'Metal'
    },
    {
        value: 'Metal Mania',
        label: 'Metal Mania'
    },
    {
        value: 'Metamorphous',
        label: 'Metamorphous'
    },
    {
        value: 'Metrophobic',
        label: 'Metrophobic'
    },
    {
        value: 'Michroma',
        label: 'Michroma'
    },
    {
        value: 'Milonga',
        label: 'Milonga'
    },
    {
        value: 'Miltonian',
        label: 'Miltonian'
    },
    {
        value: 'Miltonian Tattoo',
        label: 'Miltonian Tattoo'
    },
    {
        value: 'Mina',
        label: 'Mina'
    },
    {
        value: 'Miniver',
        label: 'Miniver'
    },
    {
        value: 'Miriam Libre',
        label: 'Miriam Libre'
    },
    {
        value: 'Mirza',
        label: 'Mirza'
    },
    {
        value: 'Miss Fajardose',
        label: 'Miss Fajardose'
    },
    {
        value: 'Mitr',
        label: 'Mitr'
    },
    {
        value: 'Modak',
        label: 'Modak'
    },
    {
        value: 'Modern Antiqua',
        label: 'Modern Antiqua'
    },
    {
        value: 'Mogra',
        label: 'Mogra'
    },
    {
        value: 'Molengo',
        label: 'Molengo'
    },
    {
        value: 'Molle',
        label: 'Molle'
    },
    {
        value: 'Monda',
        label: 'Monda'
    },
    {
        value: 'Monofett',
        label: 'Monofett'
    },
    {
        value: 'Monoton',
        label: 'Monoton'
    },
    {
        value: 'Monsieur La Doulaise',
        label: 'Monsieur La Doulaise'
    },
    {
        value: 'Montaga',
        label: 'Montaga'
    },
    {
        value: 'Montez',
        label: 'Montez'
    },
    {
        value: 'Montserrat',
        label: 'Montserrat'
    },
    {
        value: 'Montserrat Alternates',
        label: 'Montserrat Alternates'
    },
    {
        value: 'Montserrat Subrayada',
        label: 'Montserrat Subrayada'
    },
    {
        value: 'Moul',
        label: 'Moul'
    },
    {
        value: 'Moulpali',
        label: 'Moulpali'
    },
    {
        value: 'Mountains of Christmas',
        label: 'Mountains of Christmas'
    },
    {
        value: 'Mouse Memoirs',
        label: 'Mouse Memoirs'
    },
    {
        value: 'Mr Bedfort',
        label: 'Mr Bedfort'
    },
    {
        value: 'Mr Dafoe',
        label: 'Mr Dafoe'
    },
    {
        value: 'Mr De Haviland',
        label: 'Mr De Haviland'
    },
    {
        value: 'Mrs Saint Delafield',
        label: 'Mrs Saint Delafield'
    },
    {
        value: 'Mrs Sheppards',
        label: 'Mrs Sheppards'
    },
    {
        value: 'Mukta',
        label: 'Mukta'
    },
    {
        value: 'Mukta Mahee',
        label: 'Mukta Mahee'
    },
    {
        value: 'Mukta Malar',
        label: 'Mukta Malar'
    },
    {
        value: 'Mukta Vaani',
        label: 'Mukta Vaani'
    },
    {
        value: 'Mulish',
        label: 'Mulish'
    },
    {
        value: 'Mystery Quest',
        label: 'Mystery Quest'
    },
    {
        value: 'NTR',
        label: 'NTR'
    },
    {
        value: 'Nanum Brush Script',
        label: 'Nanum Brush Script'
    },
    {
        value: 'Nanum Gothic',
        label: 'Nanum Gothic'
    },
    {
        value: 'Nanum Gothic Coding',
        label: 'Nanum Gothic Coding'
    },
    {
        value: 'Nanum Myeongjo',
        label: 'Nanum Myeongjo'
    },
    {
        value: 'Nanum Pen Script',
        label: 'Nanum Pen Script'
    },
    {
        value: 'Neucha',
        label: 'Neucha'
    },
    {
        value: 'Neuton',
        label: 'Neuton'
    },
    {
        value: 'New Rocker',
        label: 'New Rocker'
    },
    {
        value: 'News Cycle',
        label: 'News Cycle'
    },
    {
        value: 'Niconne',
        label: 'Niconne'
    },
    {
        value: 'Niramit',
        label: 'Niramit'
    },
    {
        value: 'Nixie One',
        label: 'Nixie One'
    },
    {
        value: 'Nobile',
        label: 'Nobile'
    },
    {
        value: 'Nokora',
        label: 'Nokora'
    },
    {
        value: 'Norican',
        label: 'Norican'
    },
    {
        value: 'Nosifer',
        label: 'Nosifer'
    },
    {
        value: 'Notable',
        label: 'Notable'
    },
    {
        value: 'Nothing You Could Do',
        label: 'Nothing You Could Do'
    },
    {
        value: 'Noticia Text',
        label: 'Noticia Text'
    },
    {
        value: 'Noto Sans',
        label: 'Noto Sans'
    },
    {
        value: 'Noto Sans JP',
        label: 'Noto Sans JP'
    },
    {
        value: 'Noto Sans KR',
        label: 'Noto Sans KR'
    },
    {
        value: 'Noto Serif',
        label: 'Noto Serif'
    },
    {
        value: 'Noto Serif JP',
        label: 'Noto Serif JP'
    },
    {
        value: 'Noto Serif KR',
        label: 'Noto Serif KR'
    },
    {
        value: 'Nova Cut',
        label: 'Nova Cut'
    },
    {
        value: 'Nova Flat',
        label: 'Nova Flat'
    },
    {
        value: 'Nova Mono',
        label: 'Nova Mono'
    },
    {
        value: 'Nova Oval',
        label: 'Nova Oval'
    },
    {
        value: 'Nova Round',
        label: 'Nova Round'
    },
    {
        value: 'Nova Script',
        label: 'Nova Script'
    },
    {
        value: 'Nova Slim',
        label: 'Nova Slim'
    },
    {
        value: 'Nova Square',
        label: 'Nova Square'
    },
    {
        value: 'Numans',
        label: 'Numans'
    },
    {
        value: 'Nunito',
        label: 'Nunito'
    },
    {
        value: 'Nunito Sans',
        label: 'Nunito Sans'
    },
    {
        value: 'Odor Mean Chey',
        label: 'Odor Mean Chey'
    },
    {
        value: 'Offside',
        label: 'Offside'
    },
    {
        value: 'Old Standard TT',
        label: 'Old Standard TT'
    },
    {
        value: 'Oldenburg',
        label: 'Oldenburg'
    },
    {
        value: 'Oleo Script',
        label: 'Oleo Script'
    },
    {
        value: 'Oleo Script Swash Caps',
        label: 'Oleo Script Swash Caps'
    },
    {
        value: 'Open Sans',
        label: 'Open Sans'
    },
    {
        value: 'Open Sans Condensed',
        label: 'Open Sans Condensed'
    },
    {
        value: 'Oranienbaum',
        label: 'Oranienbaum'
    },
    {
        value: 'Orbitron',
        label: 'Orbitron'
    },
    {
        value: 'Oregano',
        label: 'Oregano'
    },
    {
        value: 'Orienta',
        label: 'Orienta'
    },
    {
        value: 'Original Surfer',
        label: 'Original Surfer'
    },
    {
        value: 'Oswald',
        label: 'Oswald'
    },
    {
        value: 'Over the Rainbow',
        label: 'Over the Rainbow'
    },
    {
        value: 'Overlock',
        label: 'Overlock'
    },
    {
        value: 'Overlock SC',
        label: 'Overlock SC'
    },
    {
        value: 'Overpass',
        label: 'Overpass'
    },
    {
        value: 'Overpass Mono',
        label: 'Overpass Mono'
    },
    {
        value: 'Ovo',
        label: 'Ovo'
    },
    {
        value: 'Oxygen',
        label: 'Oxygen'
    },
    {
        value: 'Oxygen Mono',
        label: 'Oxygen Mono'
    },
    {
        value: 'PT Mono',
        label: 'PT Mono'
    },
    {
        value: 'PT Sans',
        label: 'PT Sans'
    },
    {
        value: 'PT Sans Caption',
        label: 'PT Sans Caption'
    },
    {
        value: 'PT Sans Narrow',
        label: 'PT Sans Narrow'
    },
    {
        value: 'PT Serif',
        label: 'PT Serif'
    },
    {
        value: 'PT Serif Caption',
        label: 'PT Serif Caption'
    },
    {
        value: 'Pacifico',
        label: 'Pacifico'
    },
    {
        value: 'Padauk',
        label: 'Padauk'
    },
    {
        value: 'Palanquin',
        label: 'Palanquin'
    },
    {
        value: 'Palanquin Dark',
        label: 'Palanquin Dark'
    },
    {
        value: 'Pangolin',
        label: 'Pangolin'
    },
    {
        value: 'Paprika',
        label: 'Paprika'
    },
    {
        value: 'Parisienne',
        label: 'Parisienne'
    },
    {
        value: 'Passero One',
        label: 'Passero One'
    },
    {
        value: 'Passion One',
        label: 'Passion One'
    },
    {
        value: 'Pathway Gothic One',
        label: 'Pathway Gothic One'
    },
    {
        value: 'Patrick Hand',
        label: 'Patrick Hand'
    },
    {
        value: 'Patrick Hand SC',
        label: 'Patrick Hand SC'
    },
    {
        value: 'Pattaya',
        label: 'Pattaya'
    },
    {
        value: 'Patua One',
        label: 'Patua One'
    },
    {
        value: 'Pavanam',
        label: 'Pavanam'
    },
    {
        value: 'Paytone One',
        label: 'Paytone One'
    },
    {
        value: 'Peddana',
        label: 'Peddana'
    },
    {
        value: 'Peralta',
        label: 'Peralta'
    },
    {
        value: 'Permanent Marker',
        label: 'Permanent Marker'
    },
    {
        value: 'Petit Formal Script',
        label: 'Petit Formal Script'
    },
    {
        value: 'Petrona',
        label: 'Petrona'
    },
    {
        value: 'Philosopher',
        label: 'Philosopher'
    },
    {
        value: 'Piedra',
        label: 'Piedra'
    },
    {
        value: 'Pinyon Script',
        label: 'Pinyon Script'
    },
    {
        value: 'Pirata One',
        label: 'Pirata One'
    },
    {
        value: 'Plaster',
        label: 'Plaster'
    },
    {
        value: 'Play',
        label: 'Play'
    },
    {
        value: 'Playball',
        label: 'Playball'
    },
    {
        value: 'Playfair Display',
        label: 'Playfair Display'
    },
    {
        value: 'Playfair Display SC',
        label: 'Playfair Display SC'
    },
    {
        value: 'Podkova',
        label: 'Podkova'
    },
    {
        value: 'Poiret One',
        label: 'Poiret One'
    },
    {
        value: 'Poller One',
        label: 'Poller One'
    },
    {
        value: 'Poly',
        label: 'Poly'
    },
    {
        value: 'Pompiere',
        label: 'Pompiere'
    },
    {
        value: 'Pontano Sans',
        label: 'Pontano Sans'
    },
    {
        value: 'Poor Story',
        label: 'Poor Story'
    },
    {
        value: 'Poppins',
        label: 'Poppins'
    },
    {
        value: 'Port Lligat Sans',
        label: 'Port Lligat Sans'
    },
    {
        value: 'Port Lligat Slab',
        label: 'Port Lligat Slab'
    },
    {
        value: 'Pragati Narrow',
        label: 'Pragati Narrow'
    },
    {
        value: 'Prata',
        label: 'Prata'
    },
    {
        value: 'Preahvihear',
        label: 'Preahvihear'
    },
    {
        value: 'Press Start 2P',
        label: 'Press Start 2P'
    },
    {
        value: 'Pridi',
        label: 'Pridi'
    },
    {
        value: 'Princess Sofia',
        label: 'Princess Sofia'
    },
    {
        value: 'Prociono',
        label: 'Prociono'
    },
    {
        value: 'Prompt',
        label: 'Prompt'
    },
    {
        value: 'Prosto One',
        label: 'Prosto One'
    },
    {
        value: 'Proza Libre',
        label: 'Proza Libre'
    },
    {
        value: 'Puritan',
        label: 'Puritan'
    },
    {
        value: 'Purple Purse',
        label: 'Purple Purse'
    },
    {
        value: 'Quando',
        label: 'Quando'
    },
    {
        value: 'Quantico',
        label: 'Quantico'
    },
    {
        value: 'Quattrocento',
        label: 'Quattrocento'
    },
    {
        value: 'Quattrocento Sans',
        label: 'Quattrocento Sans'
    },
    {
        value: 'Questrial',
        label: 'Questrial'
    },
    {
        value: 'Quicksand',
        label: 'Quicksand'
    },
    {
        value: 'Quintessential',
        label: 'Quintessential'
    },
    {
        value: 'Qwigley',
        label: 'Qwigley'
    },
    {
        value: 'Racing Sans One',
        label: 'Racing Sans One'
    },
    {
        value: 'Radley',
        label: 'Radley'
    },
    {
        value: 'Rajdhani',
        label: 'Rajdhani'
    },
    {
        value: 'Rakkas',
        label: 'Rakkas'
    },
    {
        value: 'Raleway',
        label: 'Raleway'
    },
    {
        value: 'Raleway Dots',
        label: 'Raleway Dots'
    },
    {
        value: 'Ramabhadra',
        label: 'Ramabhadra'
    },
    {
        value: 'Ramaraja',
        label: 'Ramaraja'
    },
    {
        value: 'Rambla',
        label: 'Rambla'
    },
    {
        value: 'Rammetto One',
        label: 'Rammetto One'
    },
    {
        value: 'Ranchers',
        label: 'Ranchers'
    },
    {
        value: 'Rancho',
        label: 'Rancho'
    },
    {
        value: 'Ranga',
        label: 'Ranga'
    },
    {
        value: 'Rasa',
        label: 'Rasa'
    },
    {
        value: 'Rationale',
        label: 'Rationale'
    },
    {
        value: 'Ravi Prakash',
        label: 'Ravi Prakash'
    },
    {
        value: 'Redressed',
        label: 'Redressed'
    },
    {
        value: 'Reem Kufi',
        label: 'Reem Kufi'
    },
    {
        value: 'Reenie Beanie',
        label: 'Reenie Beanie'
    },
    {
        value: 'Revalia',
        label: 'Revalia'
    },
    {
        value: 'Rhodium Libre',
        label: 'Rhodium Libre'
    },
    {
        value: 'Ribeye',
        label: 'Ribeye'
    },
    {
        value: 'Ribeye Marrow',
        label: 'Ribeye Marrow'
    },
    {
        value: 'Righteous',
        label: 'Righteous'
    },
    {
        value: 'Risque',
        label: 'Risque'
    },
    {
        value: 'Roboto',
        label: 'Roboto'
    },
    {
        value: 'Roboto Condensed',
        label: 'Roboto Condensed'
    },
    {
        value: 'Roboto Mono',
        label: 'Roboto Mono'
    },
    {
        value: 'Roboto Slab',
        label: 'Roboto Slab'
    },
    {
        value: 'Rochester',
        label: 'Rochester'
    },
    {
        value: 'Rock Salt',
        label: 'Rock Salt'
    },
    {
        value: 'Rokkitt',
        label: 'Rokkitt'
    },
    {
        value: 'Romanesco',
        label: 'Romanesco'
    },
    {
        value: 'Ropa Sans',
        label: 'Ropa Sans'
    },
    {
        value: 'Rosario',
        label: 'Rosario'
    },
    {
        value: 'Rosarivo',
        label: 'Rosarivo'
    },
    {
        value: 'Rouge Script',
        label: 'Rouge Script'
    },
    {
        value: 'Rozha One',
        label: 'Rozha One'
    },
    {
        value: 'Rubik',
        label: 'Rubik'
    },
    {
        value: 'Rubik Mono One',
        label: 'Rubik Mono One'
    },
    {
        value: 'Ruda',
        label: 'Ruda'
    },
    {
        value: 'Rufina',
        label: 'Rufina'
    },
    {
        value: 'Ruge Boogie',
        label: 'Ruge Boogie'
    },
    {
        value: 'Ruluko',
        label: 'Ruluko'
    },
    {
        value: 'Rum Raisin',
        label: 'Rum Raisin'
    },
    {
        value: 'Ruslan Display',
        label: 'Ruslan Display'
    },
    {
        value: 'Russo One',
        label: 'Russo One'
    },
    {
        value: 'Ruthie',
        label: 'Ruthie'
    },
    {
        value: 'Rye',
        label: 'Rye'
    },
    {
        value: 'Sacramento',
        label: 'Sacramento'
    },
    {
        value: 'Sahitya',
        label: 'Sahitya'
    },
    {
        value: 'Sail',
        label: 'Sail'
    },
    {
        value: 'Saira',
        label: 'Saira'
    },
    {
        value: 'Saira Condensed',
        label: 'Saira Condensed'
    },
    {
        value: 'Saira Extra Condensed',
        label: 'Saira Extra Condensed'
    },
    {
        value: 'Saira Semi Condensed',
        label: 'Saira Semi Condensed'
    },
    {
        value: 'Salsa',
        label: 'Salsa'
    },
    {
        value: 'Sanchez',
        label: 'Sanchez'
    },
    {
        value: 'Sancreek',
        label: 'Sancreek'
    },
    {
        value: 'Sansita',
        label: 'Sansita'
    },
    {
        value: 'Sarala',
        label: 'Sarala'
    },
    {
        value: 'Sarina',
        label: 'Sarina'
    },
    {
        value: 'Sarpanch',
        label: 'Sarpanch'
    },
    {
        value: 'Satisfy',
        label: 'Satisfy'
    },
    {
        value: 'Sawarabi Gothic',
        label: 'Sawarabi Gothic'
    },
    {
        value: 'Sawarabi Mincho',
        label: 'Sawarabi Mincho'
    },
    {
        value: 'Scada',
        label: 'Scada'
    },
    {
        value: 'Scheherazade',
        label: 'Scheherazade'
    },
    {
        value: 'Schoolbell',
        label: 'Schoolbell'
    },
    {
        value: 'Scope One',
        label: 'Scope One'
    },
    {
        value: 'Seaweed Script',
        label: 'Seaweed Script'
    },
    {
        value: 'Secular One',
        label: 'Secular One'
    },
    {
        value: 'Sedgwick Ave',
        label: 'Sedgwick Ave'
    },
    {
        value: 'Sedgwick Ave Display',
        label: 'Sedgwick Ave Display'
    },
    {
        value: 'Sevillana',
        label: 'Sevillana'
    },
    {
        value: 'Seymour One',
        label: 'Seymour One'
    },
    {
        value: 'Shadows Into Light',
        label: 'Shadows Into Light'
    },
    {
        value: 'Shadows Into Light Two',
        label: 'Shadows Into Light Two'
    },
    {
        value: 'Shanti',
        label: 'Shanti'
    },
    {
        value: 'Share',
        label: 'Share'
    },
    {
        value: 'Share Tech',
        label: 'Share Tech'
    },
    {
        value: 'Share Tech Mono',
        label: 'Share Tech Mono'
    },
    {
        value: 'Shojumaru',
        label: 'Shojumaru'
    },
    {
        value: 'Short Stack',
        label: 'Short Stack'
    },
    {
        value: 'Shrikhand',
        label: 'Shrikhand'
    },
    {
        value: 'Siemreap',
        label: 'Siemreap'
    },
    {
        value: 'Sigmar One',
        label: 'Sigmar One'
    },
    {
        value: 'Signika',
        label: 'Signika'
    },
    {
        value: 'Signika Negative',
        label: 'Signika Negative'
    },
    {
        value: 'Simonetta',
        label: 'Simonetta'
    },
    {
        value: 'Sintony',
        label: 'Sintony'
    },
    {
        value: 'Sirin Stencil',
        label: 'Sirin Stencil'
    },
    {
        value: 'Six Caps',
        label: 'Six Caps'
    },
    {
        value: 'Skranji',
        label: 'Skranji'
    },
    {
        value: 'Slabo 13px',
        label: 'Slabo 13px'
    },
    {
        value: 'Slabo 27px',
        label: 'Slabo 27px'
    },
    {
        value: 'Slackey',
        label: 'Slackey'
    },
    {
        value: 'Smokum',
        label: 'Smokum'
    },
    {
        value: 'Smythe',
        label: 'Smythe'
    },
    {
        value: 'Sniglet',
        label: 'Sniglet'
    },
    {
        value: 'Snippet',
        label: 'Snippet'
    },
    {
        value: 'Snowburst One',
        label: 'Snowburst One'
    },
    {
        value: 'Sofadi One',
        label: 'Sofadi One'
    },
    {
        value: 'Sofia',
        label: 'Sofia'
    },
    {
        value: 'Song Myung',
        label: 'Song Myung'
    },
    {
        value: 'Sonsie One',
        label: 'Sonsie One'
    },
    {
        value: 'Sorts Mill Goudy',
        label: 'Sorts Mill Goudy'
    },
    {
        value: 'Source Code Pro',
        label: 'Source Code Pro'
    },
    {
        value: 'Source Sans Pro',
        label: 'Source Sans Pro'
    },
    {
        value: 'Source Serif Pro',
        label: 'Source Serif Pro'
    },
    {
        value: 'Space Mono',
        label: 'Space Mono'
    },
    {
        value: 'Special Elite',
        label: 'Special Elite'
    },
    {
        value: 'Spectral',
        label: 'Spectral'
    },
    {
        value: 'Spectral SC',
        label: 'Spectral SC'
    },
    {
        value: 'Spicy Rice',
        label: 'Spicy Rice'
    },
    {
        value: 'Spinnaker',
        label: 'Spinnaker'
    },
    {
        value: 'Spirax',
        label: 'Spirax'
    },
    {
        value: 'Squada One',
        label: 'Squada One'
    },
    {
        value: 'Sree Krushnadevaraya',
        label: 'Sree Krushnadevaraya'
    },
    {
        value: 'Sriracha',
        label: 'Sriracha'
    },
    {
        value: 'Srisakdi',
        label: 'Srisakdi'
    },
    {
        value: 'Stalemate',
        label: 'Stalemate'
    },
    {
        value: 'Stalinist One',
        label: 'Stalinist One'
    },
    {
        value: 'Stardos Stencil',
        label: 'Stardos Stencil'
    },
    {
        value: 'Stint Ultra Condensed',
        label: 'Stint Ultra Condensed'
    },
    {
        value: 'Stint Ultra Expanded',
        label: 'Stint Ultra Expanded'
    },
    {
        value: 'Stoke',
        label: 'Stoke'
    },
    {
        value: 'Strait',
        label: 'Strait'
    },
    {
        value: 'Stylish',
        label: 'Stylish'
    },
    {
        value: 'Sue Ellen Francisco',
        label: 'Sue Ellen Francisco'
    },
    {
        value: 'Suez One',
        label: 'Suez One'
    },
    {
        value: 'Sumana',
        label: 'Sumana'
    },
    {
        value: 'Sunflower',
        label: 'Sunflower'
    },
    {
        value: 'Sunshiney',
        label: 'Sunshiney'
    },
    {
        value: 'Supermercado One',
        label: 'Supermercado One'
    },
    {
        value: 'Sura',
        label: 'Sura'
    },
    {
        value: 'Suranna',
        label: 'Suranna'
    },
    {
        value: 'Suravaram',
        label: 'Suravaram'
    },
    {
        value: 'Suwannaphum',
        label: 'Suwannaphum'
    },
    {
        value: 'Swanky and Moo Moo',
        label: 'Swanky and Moo Moo'
    },
    {
        value: 'Syncopate',
        label: 'Syncopate'
    },
    {
        value: 'Tajawal',
        label: 'Tajawal'
    },
    {
        value: 'Tangerine',
        label: 'Tangerine'
    },
    {
        value: 'Taprom',
        label: 'Taprom'
    },
    {
        value: 'Tauri',
        label: 'Tauri'
    },
    {
        value: 'Taviraj',
        label: 'Taviraj'
    },
    {
        value: 'Teko',
        label: 'Teko'
    },
    {
        value: 'Telex',
        label: 'Telex'
    },
    {
        value: 'Tenali Ramakrishna',
        label: 'Tenali Ramakrishna'
    },
    {
        value: 'Tenor Sans',
        label: 'Tenor Sans'
    },
    {
        value: 'Text Me One',
        label: 'Text Me One'
    },
    {
        value: 'The Girl Next Door',
        label: 'The Girl Next Door'
    },
    {
        value: 'Tienne',
        label: 'Tienne'
    },
    {
        value: 'Tillana',
        label: 'Tillana'
    },
    {
        value: 'Timmana',
        label: 'Timmana'
    },
    {
        value: 'Tinos',
        label: 'Tinos'
    },
    {
        value: 'Titan One',
        label: 'Titan One'
    },
    {
        value: 'Titillium Web',
        label: 'Titillium Web'
    },
    {
        value: 'Trade Winds',
        label: 'Trade Winds'
    },
    {
        value: 'Trirong',
        label: 'Trirong'
    },
    {
        value: 'Trocchi',
        label: 'Trocchi'
    },
    {
        value: 'Trochut',
        label: 'Trochut'
    },
    {
        value: 'Trykker',
        label: 'Trykker'
    },
    {
        value: 'Tulpen One',
        label: 'Tulpen One'
    },
    {
        value: 'Ubuntu',
        label: 'Ubuntu'
    },
    {
        value: 'Ubuntu Condensed',
        label: 'Ubuntu Condensed'
    },
    {
        value: 'Ubuntu Mono',
        label: 'Ubuntu Mono'
    },
    {
        value: 'Ultra',
        label: 'Ultra'
    },
    {
        value: 'Uncial Antiqua',
        label: 'Uncial Antiqua'
    },
    {
        value: 'Underdog',
        label: 'Underdog'
    },
    {
        value: 'Unica One',
        label: 'Unica One'
    },
    {
        value: 'UnifrakturCook',
        label: 'UnifrakturCook'
    },
    {
        value: 'UnifrakturMaguntia',
        label: 'UnifrakturMaguntia'
    },
    {
        value: 'Unkempt',
        label: 'Unkempt'
    },
    {
        value: 'Unlock',
        label: 'Unlock'
    },
    {
        value: 'Unna',
        label: 'Unna'
    },
    {
        value: 'VT323',
        label: 'VT323'
    },
    {
        value: 'Vampiro One',
        label: 'Vampiro One'
    },
    {
        value: 'Varela',
        label: 'Varela'
    },
    {
        value: 'Varela Round',
        label: 'Varela Round'
    },
    {
        value: 'Vast Shadow',
        label: 'Vast Shadow'
    },
    {
        value: 'Vesper Libre',
        label: 'Vesper Libre'
    },
    {
        value: 'Vibur',
        label: 'Vibur'
    },
    {
        value: 'Vidaloka',
        label: 'Vidaloka'
    },
    {
        value: 'Viga',
        label: 'Viga'
    },
    {
        value: 'Voces',
        label: 'Voces'
    },
    {
        value: 'Volkhov',
        label: 'Volkhov'
    },
    {
        value: 'Vollkorn',
        label: 'Vollkorn'
    },
    {
        value: 'Vollkorn SC',
        label: 'Vollkorn SC'
    },
    {
        value: 'Voltaire',
        label: 'Voltaire'
    },
    {
        value: 'Waiting for the Sunrise',
        label: 'Waiting for the Sunrise'
    },
    {
        value: 'Wallpoet',
        label: 'Wallpoet'
    },
    {
        value: 'Walter Turncoat',
        label: 'Walter Turncoat'
    },
    {
        value: 'Warnes',
        label: 'Warnes'
    },
    {
        value: 'Wellfleet',
        label: 'Wellfleet'
    },
    {
        value: 'Wendy One',
        label: 'Wendy One'
    },
    {
        value: 'Wire One',
        label: 'Wire One'
    },
    {
        value: 'Work Sans',
        label: 'Work Sans'
    },
    {
        value: 'Yanone Kaffeesatz',
        label: 'Yanone Kaffeesatz'
    },
    {
        value: 'Yantramanav',
        label: 'Yantramanav'
    },
    {
        value: 'Yatra One',
        label: 'Yatra One'
    },
    {
        value: 'Yellowtail',
        label: 'Yellowtail'
    },
    {
        value: 'Yeon Sung',
        label: 'Yeon Sung'
    },
    {
        value: 'Yeseva One',
        label: 'Yeseva One'
    },
    {
        value: 'Yesteryear',
        label: 'Yesteryear'
    },
    {
        value: 'Yrsa',
        label: 'Yrsa'
    },
    {
        value: 'Zeyada',
        label: 'Zeyada'
    },
    {
        value: 'Zilla Slab',
        label: 'Zilla Slab'
    },
    {
        value: 'Zilla Slab Highlight',
        label: 'Zilla Slab Highlight'
    }
];