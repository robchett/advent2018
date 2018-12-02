require('./newStdLib');
const advent = require('./advent');
const input = ['ubkfmdjxyzlbgkrotcepvswaqx','uikfmdkuyzlbgerotcepvswaqh','uikfmdpxyzlbgnrotcepvswoeh','nikfmdjxyzlbgnrotqepvswyqh','qgkfmdjxyzlbgnmotcepvswaqh','uikfmdjxyzqbgnrytcepvsbaqh','uikfmdjxyzibgprotcecvswaqh','uikfmajxyzlcgnrojcepvswaqh','uvkfsdjxyzlbgnrotcepvjwaqh','uikfmdjxfzlbggrotcepvswawh','uikfmhjxyzlbgnuotcepvjwaqh','uikfmdjxyzlbuzcotcepvswaqh','uikfmdwxyzlbgnrotcepvfwamh','uikfmdexyzlbgnroecepvswhqh','uikfmdjuyzlbgnrotcqpvswafh','uikfddjxyzvbgnrotceppswaqh','yikfwdjxyzlbgnrotcepvswagh','uiktmdjxyzlbgnrotceposwajh','uikfmdsxyzlbgnroteetvswaqh','uikfpdjxyzlbgnroncepvswuqh','uikfmtjxyzlbgurotcepvswaoh','eikfmdjxyjlbgnrotcepyswaqh','uikfkdjxyzlbgnrotcepvszaqv','uikfrdjxtwlbgnrotcepvswaqh','uikfmdjxyzlbgnrotpepwswahh','kikfmdjxyzlbgnkotcepvswqqh','uikfkduxyzlbgnrotcepvswafh','uikfxhjxyzlbgnrotcegvswaqh','uikfmdjxyzlmgnrotcenvawaqh','uzkfmddxyzlbgnrltcepvswaqh','uikfmdjxyzlbgnrobcepisqaqh','uijfmdjxyzlbgnrotcexvrwaqh','uiwjmdjxyzlbgnrotceprswaqh','uhkqmdjxwzlbgnrotcepvswaqh','uiktmsjxyzwbgnrotcepvswaqh','uikfmdjxyztbgnqotcepvswcqh','uibfmdjxyzlbgnroqcepvswaqx','uwkfmdjxyxlbgnrotcfpvswaqh','uikumdjxyzlbgnrstceposwaqh','uikfzdjxyznhgnrotcepvswaqh','uikuydjxyzlbgnrotqepvswaqh','uikfmdqxyzlbgnrotfefvswaqh','yikfmdjxyzlbrnrqtcepvswaqh','uiifmdjxyzlbenrotcfpvswaqh','uxkjmdjxyzlbgnrotcmpvswaqh','uikgmdjxyzlbgnrotceovlwaqh','uikfmdjxyzvbgzrotcenvswaqh','uiufmdjxyzlbgnrotceposwazh','uiafmdjxyzlignmotcepvswaqh','uikfmdjxyzwbgnsotlepvswaqh','uikjmdjvyzlbgnrotcenvswaqh','uikfmdjxyzlbonroteepvswaqi','uikfmdjxyzldgnroxcepviwaqh','uikvmdjxyzlbgdrotrepvswaqh','uikfmdjyyzwbgnrotcepvzwaqh','uikfmdjxyzzbnnvotcepvswaqh','uikomdjxyzlbgnrotcepvuwhqh','uikfmmjxyzbbgnrotcepvswayh','uikfmdjfezlbgprotcepvswaqh','uzkfmojxmzlbgnrotcepvswaqh','uipfmdjxyzlbgnrotceyuswaqh','uikfmdjxyzlkgnmotcepvswadh','uikfmdjxyzlbgnuctcbpvswaqh','uikfqdjxyzlbogrotcepvswaqh','uikfmdjxyzlfynrotcepvswash','uikfmdjxizzmgnrotcepvswaqh','uhkfmdjxyzlbhnrotcenvswaqh','uipfmdjxyzlbgorotcepfswaqh','uikfmdjxyznbgnrotcepvswfah','uikfmujxyzlbgnrotnepvssaqh','uikfmdjxyzlxgnrotcepvsrwqh','uikfmdjxszlbgnrottvpvswaqh','umkfmdskyzlbgnrotcepvswaqh','uikfmdjxyzlbgorotcwpzswaqh','uikfmdhxyzzbgnzotcepvswaqh','jikfmdjxyzlbgnrotcepveyaqh','uirfmdlxyzlbgnjotcepvswaqh','uikfmdjxyzlbgnrorxepvswazh','uikfmdjxyzltgnrotcepvsxaqi','uikfmdjxyzlbxlrotcepkswaqh','uvkfmdjxyzlbgnrotcopvswxqh','uxkfmdjxkzlbgnrotcepvswqqh','uikfmdjxyzlbqnrotcepvhwrqh','uikfmdjxyzlvgnrolcepvswrqh','urkfmdixyzlbgnrotcepvsjaqh','uikfmdjxymlbsnrotcepvswcqh','uikfmdjxyilbgnrotcepvcwzqh','uikfadjxlzlbgnrotcepvswaql','uikfmdjxuzlbgdrotcgpvswaqh','yikfmdgxyzlbgnrotcepvswarh','uikfmdjxyzlbgorotcepcswaqv','uikkmdjxyzlbvnrotcepvvwaqh','uwzfmdjxyxlbgnrotcfpvswaqh','uikfmdjxyztbgnrotcrtvswaqh','uiufmdjxyzhbgnrotcupvswaqh','uikfzdjcyzlbgnrotcfpvswaqh','uipfmdjxyzlbgnrotavpvswaqh','uikfmajxyzlbgnrotcepbsxaqh','uikfmdjfyzlbgnrotbepvswmqh','gikkmdjxyzlbgnrptcepvswaqh','uikfmdjxqvlbgnrotsepvswaqh','fikfmdjxyzlbgnrotcegvswoqh','idkfmdjxyzlbgnrotcepwswaqh','uikfmdqxyzlbmnrobcepvswaqh','uikfmdjxyzpbgnroicepvsyaqh','uikfmkoxyzlbgnrotcgpvswaqh','unkfmdjxyzlbpnrolcepvswaqh','uikfmdjmyzlbgfrotcupvswaqh','ujkfmdjxynlbgnroteepvswaqh','uikfmljxyzlbgnaotcepvsiaqh','uikfmdjdyzlbgnrotcepvtwaqd','uikfmdjxyzlbgnyotcepimwaqh','uikfmdjxyzfbjnrotcepvxwaqh','eiwfmdjxyzlbgnrdtcepvswaqh','umkhmdjxyzlbgnrotceivswaqh','uikfmdjxyzlbgnrotcwpvswneh','uckfmdjxyzlbknrotcepvswauh','uiofmdjoyzlbgnrbtcepvswaqh','uikfmdbxyzlbgnrotcepaslaqh','uimfmdjxyalbgnrotcepvswaxh','uqkfmdjxyzlbwnrotcepmswaqh','uiyfmdjxyzlbgnrotcepvswxuh','uikfmdjxyzlbgmrotgepvswamh','uikfmdjxyqlbgarozcepvswaqh','uikfmdjxyzabanpotcepvswaqh','uikfmdjgyzlbsnrotcepvswaqj','uikfmdjxyzlbwnrottepvsvaqh','uikfmdjxyzlbbnrotcepvofaqh','uikfudjxyzlbgnustcepvswaqh','cskfmqjxyzlbgnrotcepvswaqh','uiwfmddxyzlbgnrotccpvswaqh','eikpmdjxyzlbgnrotcesvswaqh','uikfmdzxyzlngnrrtcepvswaqh','uikfmdjxyzlbgnrotcepaswtph','uirfmdjxyzlbgnrotcepvswsqe','uikjmdjxqzlbgirotcepvswaqh','uikfmdjxsllbknrotcepvswaqh','uikfmdjxyqlbgcrotcepvswaqu','uikfmdjsymlbgnrotcebvswaqh','uikfmdjxezlbgnroccepviwaqh','uikfmdjiyzjbgnrotcepvswarh','uqkfmdjxyzmbgnrotcepvslaqh','unkfmdjxyzlbinrotceplswaqh','uikfmdjxyzpbgnrjtcedvswaqh','uicfmdjxyzlbgrrotcepvswamh','ukknmdjxyzlbgnqotcepvswaqh','uikfudjxyzlbdnrztcepvswaqh','uikfmdjxyzlbgnrozcepvswawk','uikfmduxyzsbgnrotcepvswauh','uikfmdjxyzljbnrotcenvswaqh','uukfmdjxyzlbgnrotcckvswaqh','uilfldjxyzlbgnrotcdpvswaqh','uckfmdjxyvybgnrotcepvswaqh','qikfmdjxyglbgnrotcepvrwaqh','uikfmhjxyzltgnrotcepvswbqh','uikfmdjxipabgnrotcepvswaqh','uikfmdjxyzlbgnrotceovswanl','uikfmdjxyzlbgirotcapvswahh','uikfucjxyflbgnrotcepvswaqh','pikfmdjxyzpbgnrotcepvswaeh','uikfmdjiyylbgnrotcervswaqh','uikfmdjgyzlbgnrotcaevswaqh','uikvmdjxyzlbunrotcepvswarh','uikfadjuyzpbgnrotcepvswaqh','uikfmdjxyzlbgnrotcepsawaqj','eikfmdjxyflbgnrotcepvswaeh','uisfmdaxyzlbgnrotcepvswlqh','vikfmdjxyzlzgnrotcepvswanh','ukkfmdoxyzlbgnrotcewvswaqh','uikfmdhxyzlbgnrotcrpvbwaqh','uhkfmdjwezlbgnrotcepvswaqh','uikfddjxyzlbgnroteepvpwaqh','uikfmdjxczlbgncotiepvswaqh','uikfvdjxyzlbgnrotcnpvsaaqh','uikfmdjxyzlbgnritcepvlwmqh','uikfmdjxczlcgnrotcecvswaqh','mikfmdjxyzlbgnrotcepvswasi','uifvmdjxyzlbgnrotpepvswaqh','uikzmdjxyzlbgnrotrepvswaqs','uikfmqjqyzlbunrotcepvswaqh','uikfpdyxyzlbgnrotcepvswagh','uikfmdjxyzobgnrotrlpvswaqh','zisdmdjxyzlbgnrotcepvswaqh','uikfmdjxyzlbgnlotiesvswaqh','uikfddixyzlbgnroucepvswaqh','uijfmdrxyzlbgnrotoepvswaqh','uikfmdcxbzlbgnrotcepvpwaqh','uikfmdjxxzlbfnrotcecvswaqh','upkfmdjxyzmtgnrotcepvswaqh','uikfmdrxyzlbgnrjtcepvswaqp','uizfmdjxyzlbsnrotcepviwaqh','uidfmdjxyslbgnrotcxpvswaqh','uikfmdjxyzlbgnrovyepvsdaqh','uiafmdjxyzlbgnrxtcepvsdaqh','ugkfmdjxyzlbgnrodcepvswawh','pikfmtjxyzhbgnrotcepvswaqh','uikfmdjxyzlfgnvotcepvswtqh','uikbmdjxyzlbgerotcepvswaqm','uikfmdjxyhlbdnrotcepvswaqy','uikfgdjxyzlbgnhotcepvswdqh','uikfmdpxyzlbgnrotcepvscanh','uikfmdjxyzsbgnretcepvswaqn','uikfddjxyzlrgnrotcepvsbaqh','uikfmdjxyzlbgnrotcqnrswaqh','uhkfmejxyzlbgnrotvepvswaqh','uikimdjxyzlngnrotceprswaqh','uikfmdjxyzwbunrotiepvswaqh','rikfmdjxyzlbgnrotcypvssaqh','uikfmdjxyzlbdnrotcrpvswsqh','uekfmdjxkzlbznrotcepvswaqh','uikfmdjxyglbgvrotcepvswaqv','uikfmcjxyzlbgnrotmeovswaqh','uikfmdjxyznbgnrozcepvswaqm','uikfmdjxyzlbdnrotcepdsyaqh','umkfmdjxfzlbgnrotiepvswaqh','uitfmdjxyzvbcnrotcepvswaqh','uikfmdjqyzlbgnrvtcepvlwaqh','uikfmdjxyzkbworotcepvswaqh','uikfmdzxyzlbwnrotcypvswaqh','uikfmdjxyklbgnrftyepvswaqh','uinfmsjxyzlbgnrotcepsswaqh','xisfmdjxymlbgnrotcepvswaqh','uikfmdjxjzlbgnropcepvswaqv','uikfmdjxyalegyrotcepvswaqh','uikfydjxyzlbgnrotcekvswtqh','uikwmojxyzlbgnromcepvswaqh','uikdmdjayzlbgnrotcepvswzqh','uikfmdjxyzlmvnrotctpvswaqh','uikfmbjxyzlbgnrotceptsweqh','yvkfmdjxyzlbgqrotcepvswaqh','uikomdjxfxlbgnrotcepvswaqh','uikfmdjxczlbgnroocepgswaqh','uikemdjxizlbgnrotcegvswaqh','uikdmdjxyzlbgwrotceprswaqh','tiyfmdjfyzlbgnrotcepvswaqh','tmkfmdjxyzlbgirotcepvswaqh','uikfmdjxyzebgnzotcepqswaqh','uikfmljxyzlbgnrwtcepvswaeh','uikfmojxyzlbgnrotcepbswwqh','uikfmdjxyzlbgsrotcewvswwqh','uikfmdjhyzlbgdrogcepvswaqh','uikfmvjxyzlbrnrltcepvswaqh','jikfmdjxyzlbgnrotcepvgcaqh','uikhtdjxyzlbgnrotcepvswarh','uikfmdjxyezbgnritcepvswaqh','uikfwdjxyzlbgnrotzepvsnaqh','uikfmdjxqylbgnrobcepvswaqh','zikzmdjxyzlbgnrhtcepvswaqh','uiksmzjxyzlbgnrftcepvswaqh','uikfmdjxuzlbgnrotcepvsvaqc'];

function part1(input) {
	var initial = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
	var res = input
		.map(v => v.split(""))
		.map(v => v.uniq())
		.map(v => v.uniq())
		.reduce((a, v) => {Object.keys(v).forEach(k => a[k]++); return a}, initial);
	return res[2] * res[3];
}

function part2(input) {
	var sets = input
		.map(v => v.split(""));
	for(var i = 0; i < sets.length; i++) {
		inner: for(var j = i+1; j < sets.length; j++) {
			var diff = 0;
			var out = [];
			for (var k = 0; k < sets[0].length; k++) {
				if (sets[i][k] != sets[j][k]) {
					diff++
				} else {
					out.push(sets[j][k]);
				}
				if (diff > 1) continue inner;
			}
			return out.join('');
		}
	}
}

advent.test(part1, ["abcdef","bababc","abbcde","abcccd","aabcdd","abcdee","ababab"], 12);
advent.run(part1, input);

advent.test(part2, ['abcde','fghij','klmno','pqrst','fguij','axcye','wvxyz'], 'fgij');
advent.run(part2, input);