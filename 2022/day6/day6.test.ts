import { part1, part2 } from './day6'

describe('Day 6', () => {
  describe('Examples', () => {
    describe('Part 1', () => {
      test('Example 1', () => {
        expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(7)
      })

      test('Example 2', () => {
        expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
      })

      test('Example 3', () => {
        expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
      })

      test('Example 4', () => {
        expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10)
      })

      test('Example 5', () => {
        expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11)
      })
    })

    describe('Part 2', () => {
      test('Example 1', () => {
        expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(19)
      })

      test('Example 2', () => {
        expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(23)
      })

      test('Example 3', () => {
        expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23)
      })

      test('Example 4', () => {
        expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(29)
      })

      test('Example 5', () => {
        expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(26)
      })
    })
  })

  describe('Solutions', () => {
    const input = 'mgtgddtfdtffzvznvnrncrrbqqhlhhffzqqzpqqthhrhhfphfphhcppcddnwdnwwtmwttfvvthvvrrbvbmvmssrlslfslflppblllwrlrzlldwdllqblqbqbsscmsmwwffjpppnlnhllbblvbvsbbzvzrzzsmsjsddfpftfvtffgjjfzjfjqfqjfjsscvcccgttgtzgzmgmtmbbwzzjqzzdfzfmzmzfzwzvwvggqcqrrcwrcrzrccqcwwbgbqqwdqqzjzsjjwbjjssmmcfcbcddlhhtltmtlljffvjffhghmggmvvfgfqgfgppnpllmvmfvvzjjzrztztvvstsvvppqdpprjjmtmjtmjjdrdcrdccgsccnsccqsqzszqsqgqwggbhbllvclljrrlrqlljtjcjjlrlhrhjhjnnnpllwtwstttlnlqnlnmnqnpqpbqqbgbzzrhzrhzhrzhrzhzshhqvqgqgbbcqccqmcqccvgccrwrgwrgrdrhhbshbhwbhwbhhvthvttfrrqsstqssqmmpnpwpfpcffcdchhrsshrhggtcttmrrhvvjfvjvvclvllmqmvvhddrdjjhdhvhlvhlltlstltffbbqbwqbbbnsbnbwbssjwsjsfjjsjwwzttqzzsdspprlrblrltrrfrsfffwqwpwddddnqqtbtwwhwpwdwmmcrmrsmmwppjzpjpcpdpjpdpdqppmjjlqqjfqqhgqhhbddtccthhwjhhlfftvtppwzpwzpznpzpqpgqpgpnpdndnbnddqrrjdjwwdmmtnntvnnrhrfhfrfwfvwffmnfnlfldfdjjwgwqqwwsslrrvhhrqqsfqfllrmrqmrrbppwjppmlmggvppdhppspjjzljjrzzrlzrrlldllvlpvpfprfprrhdrdlllpqqfhqqhchzzzwpwjpjjgzzwqqtqdqbdbdgggbrgrzzznwwbvbnbpnbpprnrvvfvsscncrczcbchhjqhjjzrznndwnnvttmtthssgvvbvfvtvptpthhzggnjjhrjdqzjbtfpqdtwtmgnngqdzhdrfzqvcqggmcdbsdrdrmgqhmvfvdgbvrnlbhfsbpjhwgzfndqgcjdbpsffcslfcltsbclspdjhscqrncfrjrbjfzspccshtrdggjbhthrrhgnjvsptfnjvjvhhdjfbtfgpfgszhhbcvzplclrnsrpffpjhbthnfsfflqphhjjdpcfwzhfdpnsftrnfhrdhndlrnfrnvprtvnmgclzlrdjrzdcllvlwdlrcfbsgcbwcnbvjztzfsgcgqlmgcbsgwbbrmrcthfpvmbfvtbhqstccfntmphqpjwpbcdpnffqpszlnqdcqtfhvlvpgdpljvcschdtpvcswfzcbpqdhfjzzdjvgldspcvlnfnwffhjzdnbmjjtnrqlgnggsvdltnrpcfwqvphtsmrfzhflwjjbnpwlzhhmdnpqptgcjnrrgcnhwllqsbsjjvzmqsghlzvhdfbrnfhrqjswrpgcctsqvdwzgpqdssfmtgwvsznlbhsgppwdhhtjmscjfrjdgflwcrlbsfwrnvtnmcwpndhtttgqfvmvmfnwdrrvgmgdqlqvvlphwzgmwcphjvcfsqbbwttntmgvfmlmctggmtlwtmfsmczbgdvbsjstzgflnjplgrlhbbgldlchwmhclzbcwpqzlzbjzbplnvpbzjhmwfmrfnwlnsvpzhrgjdpqvnjtbfjfsvdqcfwdjftsmfqdrqllwlbnbmgtswrhbtbqlchznbgnphgntrtwbtmsjtphhqpbngwmmsdnsdqcctrsrzbrtpwtvhvqbrjldfldllpvspthdhdljfvjzcjsltwflscfqsrvzhgvzhqnnjwdwdtnsvgchzrnbzfscvsmrmqsqjmrjjdhtspbzpqtqqbfbzrddwqzwpqjbpbbbghlwmzhqvqdwwwwvltvvcpgzlwzvmqzfcgnjpjnpgsccvzpnzjwwnnjrcpbvwljfrjqzwsrvdmqwwfpldqcdwlchvggclmwnbhlrlzvsrtrqmzchqfqfhqfjgqsfvclnchdnnvdbqpcddnldggwrpbgrwwtssfndhrhnwtqmgrwpggntlqmfgbzjhwwsclvfmwgzzfrsccdfddntnlldpnwzhnzlssnnfbvjjhnrvclmphgfpvnwjzznbvgqnpljcrjpndgrlbdzsbfrrrfztbqcbphlppwcvhmrrmtrlvfjcddtznlmflrpsclgjpqczwrptfsccmdpzfvwnfsvshcnzrjrmstrslhgtrsmgplvcwptfqrgzgwhvtvrqlrjpcbztgtfwpnzqpmctvpdlgrtzzlsmgnftqvtvcmndspjqbdnmrttwhdrncsntntmrwjrqstdrptnhbqgtlqsdqfmbjtvgstndlvndqqsbqvcghwwjdzpszrsfpdzvnmnbzngczndtwtmprbzjdzbthslttzwwfptbphqwczsrqcbcbqnhbtcpjpbcqpjgjmhmfnggcbvctslpmqrpqzbcfrcgzmzpbpwzsjlrmpfzhgnnbqfrbslrfsthgtmsdfhzgdmjwwsgcdptssmbvffhlmfvwnmbpnzbvpsvnwsvsgrcmhpclwsbvtfqstnpzvgmgfcrmjhbccwcptssjhbfmzsqljjcrnnszvffzfwgcpnqrtjnqdltwnbglwlwpschvqwfdztvcwsqtwmgwccgsqbsvlwdhlnqphwtcmdpvvrqfwmlbptbvghvjntqbcsqjspwnmvdqcfbqzqchhhwqgdcmdhfvtzprscpshpbmzhwsznlpvzrwvmhtqsclzffgnvvrfbzmvqmnrrzjbmhdbspjprrmflgrwhnhcqpczchpnrnfjgdlnlrnzwnvjpmzgpfzspwmfnwcrrdczdhtnscmwqwqbcrdrsndpwbdvpgpbpsfzbmvjlsrdcgnwgrvmjnzlpnwtcrmnfcqgmlnhqbwlrnzlbdrnzfhnqddsfmnhnrrrdjgqprmgvrnhzrlccjthhfzdbltgrbrjpmbhvgrlwngdlfsljhfvwhvpmltdfnzwzcgzdpppnzcnpjttdgpzzqppnfzlmhrngbmcmshtgzbjllwstdbnmmwlrlllgfgshvcsjbpnggzrvvmvdqhjhvhmmpvrdqbrfpdtcdbqrvwhdrtqgftnwwzrcgzwmwjmdgmfswqwlgmvmvhscjmzshtbzmfmbqtbsjppzbczwcqpqhhqdggcntdchjgwsvfnzfqdzvhpnwbjhbqnldzbzmctcdqgjsmbqdzmmtjzvqzdqzsfpmncdmqlnpsrwcznbtzqtbcwwdqjftcdmmwdjdnwvpchffsmqmmwvqfgcnfhbjsttwnwppssmvrrhrbqwsncpfnbfggdqjwbgtvgtwsmlqbwzlghnzhjwphswjtbtptmhlzhvvrwqqcgwnmcqtcjlndwgjrpschhhsmrvvwtrjplwrtswhrjlgjhzgzrjhsbrjhtgnmfdvbjlntcrphsnmdcjzgwtvgldrfpcfgpzlgsfthdmpbnhmlsbnbqzpqvzzmvswbbnbtzvbsznqdgqlbbwzhjrzndltfgswtszsmmrhrcrcrcpgtqfcrmjrtflsbcbbmrsrfgnsrmbrpcvfpmqtmbrbbqtzrjntnvbvwjwqmwmcvmzccmwcnhrfpgghlqczcfszfhqgrdnfpnrrzpzbnjqjtvbglvqlhpstpzzcwrdgfhghqtsgzgsmgnpgvbsvsjtnwbvtqpcfdvhnjjvwjwglplthmghrwpmsgbdbfpvqsmsdvjgchlnlnczlzczqmjsnpgrgqgndwzdtlmmgzjpqvbqmcmhnhpqvpjjsftctwsrfmhrlctrvhczjbfsvqnshmchdsrmlrlqdnfsvhlblwghsdnrtwnpdtqgczmghqcmfzvsgqvrngjvbjsvnpzvpsplhvndvqpjjrtmrqscjrhvdmqcgwjmrgsdmgswgnbpdtgvvbrzrcwtvvwhpmcqwdtsmwwfgdpdrjsbvtbdvbhwftqznpssnsnjnclblslfgz'

    test('Part 1', () => {
      expect(part1(input)).toEqual(1042)
    })

    test('Part 2', () => {
      expect(part2(input)).toEqual(2980)
    })
  })
})
