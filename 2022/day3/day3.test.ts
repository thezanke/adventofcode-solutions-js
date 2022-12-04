import { part1, part2 } from './day3';

describe('Day 3', () => {
  describe('Examples', () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

    test('part 1 example', () => {
      expect(part1(input)).toEqual(157);
    });

    test('part 2 example', () => {
      expect(part2(input)).toEqual(70);
    });
  });

  describe('Solutions', () => {
    const input = `RCMRQjLLWGTjnlnZwwnZJRZH
qnvfhpSbvSppNddNdSqbbmmdPrwttJVrVPDVrJtHtwPZhrPJ
BFpFzSSqSFFSvQsnWgCMjTLzng
DbWVcVRRdlLffvtqjTWNgQ
mJJMpsmrMrJSHJpsHrFHvBvgHvqfNvzffgTvfj
mMhPjmjmFPJhMSGGcDRlwRdcLGPc
qFcbmWFJqqWpRJcQWpqsQQQwSPCPrHRHCPdNZtSrSHwrNZ
jGMjGLhhhgTvghgtGVjnNCrPVwZSZffSNSwHZZdH
DvzDlvvhnjlMlglglGGhDLpqqcJWWtsmszpWbBBBmQmb
SPLPHQbJSbPsvTLmfDvVDctvWhcDlD
jdRRzzGgJqwrpMRMgdjlcVcWqfWWlfDlmmlWhB
rwgRGdpGprNNLQLsbZJPsn
GZhTVLztHrSzrRBz
MJWjMvsfSCLSnrJn
MjglcgWMdccvZGFtTDchLLLh
rgDHBgBjRgRTgwzwthBnQwmBtB
MsMpSfMsTGTFFLdFFFMFsnNmthNnzhthtwmWnznz
pZMpJdvJMGRHVJJTVHjb
TQVqZVBcBBdBfbpN
zvzrtCshrntCHslPMMMFpZHbNSpb
hLWhGLttsvLvrrWvhzVmQgwJZTRcggTjGcgT
SqRGLHtSbtNTbhjFTjDDpF
WwgJgmdmMdwPDVQQBBhSBFwV
JMPlmlSldWZmRqtLsRGRtvls
mZvmvPNmlNJPJzzmgNvNgdqqdBSpfHBqSsHqHfwpsffq
nhDQDrwLrVVnqfGnsBGBGGsH
VjCDMhbDjLjtFhtLhLhQjNZcZPwWWcczmvglgJJN
wwqnwZGGZqqMpMprpZqwGlLDtNDffdBdNVBmNGBN
TSTchTFbRLfLmVhNDm
SCLRvJQvRFTSRjqMqPZrZnrzZzjp
cJfqGjgGJcsgsPnghgBm
FHHbQQHLWLbPQThqQQRnZs
lLLMSCvrlFMwlSlFcNwqDVVpJcfjzVDf
cRdRDhsDFzPztwJdGP
CVqpCqCgSNfCSQBpjtBwtlBBHLlmGjGG
qfQfCVQfgQnVNpQCMqfcrFrwWDhrDnsvcRDsbc
nFWWzqWZQSqnJzNJzslJVsdV
vBBvsLvbBmBmRlGTNJJvRRTD
tBbpmmPwCmHpMHHMrPCCcSnZSgcFcZgWFscSfgth
LLssTJrqrpvrvvpJvdjggMlgzVgVggPlFPqz
HwZwCZfHNtbMzjgVnFPC
RSttfRwZDtBcZwQMQdrQsdTBQQmW
lJnNhMJqljlNhSrdWlGGGQHwwH
vbTpbCsTFCTmbSmcRfVCfRpwcPdwWQQrdwHwBHrPdwrLLB
sVTmDfmCTVmJjgSzzntDtt
DQtMjZHZHvMbwwTSpqLtpJ
FzVFlsNdVczWPzWcslVfSLqLsqJpSwwsJswLrf
dNFFWcmzWFGLWcdcFgvZvvRHQvjMHDMBGD
MVPTmPvbMgrTmmmmMRMvPvBwFGhhDCdFFwLCLdJhDGFRhG
fqqWfpZWzWsDwhwdhwqGLD
ZWSSftStnnplcQLSbVMBvTbrMlbrBvvl
FSsHDmtFLbbFbLGg
vrvzTzWzzzvppzSzTMnfTggjVgbgjbLjgPPnbGbVGL
pdMwrBpfwfSMTTWdMTpBDCBtmsmltslcBDCshDHs
RgbmfGtmRVgLLSVSnSrWWSHhnh
ccTvlvNppsFnbFnhnWnPHJ
pqNjDBjNNjvpZfmtjbCLbCmb
qsSVpSVfWqgNrVtWptpmSfqbPQljbHPHlDnljRSlwSnwQn
dcGBrMFMdLTGGdlwDwMRHwwMbjHP
CFBvhFhTLFCGvFchChBdBTJtsNpWqfVgtszprmVWNqNgvV
sjsTgNSNqSjgMmVPmmmrpH
RftCcWddRCZfPtCfcQZdcZDcrBllBFpVHprHWlHHpHJJmlFp
thPZRtLcDRdDCTTsqbnwjhvNjq
TQPtgfgdPcdSQhjwHhHBLS
RrqCqVVbJmVRJmsrzmJpWljlSHLSBwSSRWllWv
CVrDNbHrJHVMCbrDJsdFdFcPFZngMfFdTPfP
NNlZgndqmGVGGVZNWQmWmbhbbhpbbhtCbhtgCpCtMF
THfLPTzwJTJrvHRwwsbFbhfbMCpphVtBbB
RjrvzHLzPDvLzPHrTJVrwPndZQNlDZGndZWDdNNcmlQq
tjDsjDGtTjVVbQVCggvrbg
qrWWRBllRFrdlSMCdbSJCP
cZcncRnhphpZWRNtrmsrGpHffmwH
qpRjdcqTcMbbMRTwtnplnwnhPzhBhw
FSFLvNrsPNrsGSLsrFSGfnwBQwZnZwhQQLwwQhnn
sWNVmVmCFNWGsCrrjRTmMjRjPRqgJqJg
sVCnzVpmFpVSnNFCmnmzwRFDWDdMllDccMdwDMjWjWlWjg
BJbPJGGGHPZqZQbpMlWWMWlBljjjgDjh
tGQPpZtfTPpqrHsVLSzmRNLtSFsN
WCDlBWWlvMFWlQWpmSZdZnNmGfJZFZ
LqjTjgtjPcHTTJgLThztcLTLnHnmdSpZdpdffnmZSppfGpSn
PtzqzjtqJgggzhqqccqhrQMsMvMwrCwMlBvMwvvsvs
NMsJfsHTMVbjnLnVsC
htWllhmZcWDWBwhZPcmpVRjnVMRLCCjLFpCwRb
PmZMrBtcPmZWhzDWBtMmJQdddHfQGNSqHqQGGTgr
NmfnnsPlHnGqnlsNNmRPltRLvrhvrSGJSJjvFFFSSFJLhb
PzQZccVPVwgPjrJSJjhFFpQr
TdwBgdTVwzdwzlmNfRqPmqqTql
BVLLBPmPmWBlMlLJnJlBlFQVgdRDdRZRZHpZjQzdRdZQdzQZ
trGTsfbTTgHZptzSZW
fsfTNcCqqNhhVhVFVhVBWLLB
LJwgJNfbCvwCJCwBCCNhhHmGHWWSMWmWmbMmTmmGdS
lzRnnltsstZzzRTfHtHWHGWftfHW
ZFFzVFqzqlFcZscZpRZsNphjhjvjfgJhQgQvwvhC
HHzcFNcHFjhjZjlrghLL
pMZJptpZWCmpttRMCWnnDnBGGDLhlLQrhl
MJsMCTZTTpTJRmMCJzfNsNcfNHqzvvfcww
ZDtllsDlVsrQBqQqRfWl
wvJgpPhhscgvpJFNrRjRrWRjqrRjdjRv
zpsNzCsNCJCCPPHSLzznMnDSLGLM
rfrJjFWrwjpnJjjjfrjJJnFVTgTggRWRRRPPLQgCgQcPPT
sSNbSvqmsSZDZZBtNTTPGgMLMRVcgPCMRb
zZDZzNNSmrfpjFCjzj
dbbNJPBbbrFqNqttqrGbqDcmDQRmFmwcwSnQSDcpwS
ZMMTsHjzLlLcnSVwpRRQ
hZTWjWvTZzTTWhszfwbJhrgJqtBbJGdqNPqt
rrqgHrgtcHJRRjWZlRvnnWBn
QbhVmdFppwbdjnMvlnBwMWZP
TpFDdVTFTDfhHfJcSJSzGZGf
sqNTNZHsHjjFBBwJMMNMcCJD
WGLQPjfWfQWPWmtLSRRRLwBJDbtCCJJCbbwCMBbMBc
RnPdLQfPLRdndGGRvfjlgdrTTgTsrgTrZFzF
BfHbjVVqSBFfMSlCLCDrGSQssvlr
tTpnnzpcPnwzhcnJTDtTPRprGlRGGGCWlQsWvrlvrQGQrC
DPwhghDTpPVHqqdgZbZq
ZzPqfGPtRtqfqPbqfGgGZbrhMjmjBCpHpHNCmHtHjmBHnj
QJwllvFWwDvnwCBBzjwwpC
ccJLVQzWFJvVJlVbgrZZLZLRRPSgdr
rBGbLbnTfnZrQbTnHldqsMmHsqlsWfMd
JcJjCCPzPtjCNHdlGGMlll
jjgpRRvcGbwpThVppT
ttDfjtqfjtpTWWwfTbtlWccNGRSZNGPGhZGhGhcwRh
LbCrHdvzLSSHmSRNmc
JCsBvrvBLzFQbbvlVVnpQpDtWlDqfq
vvdvJBfvdTvRBflBJPNmmffmgPCMwDgsss
rFjqLnMcnqrrtMLtjNgCPCsNzzgsPCGFNs
VqLqnLVZqjMZqWnrVtWlZJJSvHvBdRSvBdRvvJ
zZBDzgQQZLlcglzjrCrCMFjGZbMsHm
PnnJVRfttTtwVnnVFGHVsjCFCjrsMM
wPRpRpRnNTpPNlBdQQDdgDNMhN
bNQpFpnwgtDHpbnhWtffmfmhvhhfsZ
LcdLdwCLPPSVSqqwZGhWdJhGJZhlGlsm
TBwSLPSPVRSVqSVqVrcnpMDDngMgnQpbRQFDNH
vPSvBJZSSdJgpJJZBDGDGrdqGdllGrGDrh
HMtsltFlRVVFtlscRjjMcsWwWChWmrnwDWGwChmjGCWq
MQHNlTVHNVHpbbpbTvvBvf
VsbPMwhbWhzdpzNNggnBcTBWNngQ
RmtZZFZqSjqVHmGQNcBHNLGLGHQH
JjRClqCjZlDZmqSqljFZZqRCvsvPfshhMdwsDwbVwzMzhffb
bfGtRgfDtVmsMzTbmz
LjGZwQLLdjFdHLNMhmzBzMNHNmzN
wjQLCFvnnQGdZLGWSjdqWDfPlrRpqRDDRqrpPr
pqnBZqjCNCqQqmllpHGMGdTfML
PsFgrRvSPsWTwWWQwGHLHW
SrvgsFbrrPJJFsrFPtFSCChBDQjqCqtNhDqhCqNC
RJZRWZWMWZPZffRCPWMdRdfQQQjJzHQsssjrSQFVschVHr
NgpnDgvGTNTVFHFFjVFF
jntvgljpGvlnbLtLbBvnLRPlCCwwCfRqMCCqqqddqw
PFBMVDSVPHMTThtMtSBMMVNbQprHbNRgNRRgLnvpnjnN
scGcrcwlswdGlcqvbQgnnpQnqLjnpp
ffwswWzcmlcWWsmcZhrDFrZMFZBMFzhM
LMdZGqdRSSZmCZMRfQjnggvlvggRcznz
tjjFhBrtpthpslcvvlcQzFnFvQ
jrhbjtpJtbZqCLdWLq
HBGBfBttZzbGbljPdpFddFqRmqRzRN
JDWghDDSDqmmDDpc
CLvgMvChCvLphCTSShhMhQsBbfTfsGsrBfjfrljrZZff
RgHgDqDzqQqgcdHqcZGTNlGffGBDGZBTGZ
LFLPWsmvrbwhwwswrTlTTCBNGFfGlNJZNS
vhrLnvhNmWvMsrvwqMdRcptQtztcjptz
sLMLsThhjgqLlsnsLgTLtMFcRbcPcJSwJbbSbtSWScSt
fvrjjDjvNprdPwwJCCSrWPFP
vfZdGzVzfvGGVGpBjnnMglTsgZlqsMlM
TCVMfCfBnHHfLLPFWb
GgQlGJzNzbzHcHHLlcPLHL
tQbNQGgRZZCVtVMZ
QFFMzwjwngsvsBjGGJWbBbBWbB
QdmVDmVDWRPWVPVV
QHtHSdDpLQCCSHrtqrdrttDfLgvnFvFghNszzwgngFwsNF
RzzTNpSRBzSBVpSRlHNSHBSSGPcLNGtjhPPcbcGhPPhcrnct
CCmmCwwdfFJqDmdwsddhsmvdcMbLfcftttbPnjMPbcjPMPbP
mdZQmvssFdqsFZvsZQmvDvmWzgQBWTRzTzHlppWRglHBQh
VWmnfQWzWWnHWMfmmMVNMfWjtBtBNSNSrlStlpjJBBlgBS
cZZvbwsZsbbZvvscCRdFTTTQrBStdBJgSdhjgBjBjJjpJJ
wCFTCbZbFwwCTvFTwsPGccMzMDWVWfzLGmqHnnDHGLQL
sNQQHbbhdlpdrQllqpsqSpGjZDZGgDnVcnjjnnDZ
WWRLGFvJBJPvzzWjnTncDVZTTPgDff
FLRLGRFRJLBWJmJzMRLCvldrMrbbltdhQQlNqtMbsb
HZllwlZSlSZwhvmQjcZhTqcT
sPzzdgpszpzsBdvvMccvcqPThjhM
JDdsDspLzsdzBgVdBGBzCLlwbbwWSnlnnWffHwJcNlHw
nzCTCnpqJqfCnvvjZjWjPcZrmcmZfW
GNdwgVjwRdRglMrPWLPWZWcNWW
dVblgtRwQgSGVBldbQBbBRJnQJTsJHTqnzzJFpjvHnnn
dqpQQrdqQpLfqcGSdggQdgRMmwHBMMBVNRNDFFBDBgNt
vTzsnZCnlCnshbPlvZJbBzVmmVRDNwtHFBwMDVBR
lJCshjTJbVqfVdjjjG
WlLCJlHLcZcJWcWZJnLHnPqlFtSthTnFNThVtNhVhvNVzVtF
QfbgRsspfDRsgfjqqRRpDbSNSTFzBbTbhttVBhVNBzzT
fwgfRdpdfQDqgPHHZJZCcdGddH
sbrbmVmfddzJntZZtwtMMf
PvhwPRlvvWhFvSRhpFMMJGMFppnBTBGJ
RPlCCLDPDClwHbrdzsdNLzgs
HZgqtgbqRZvzwzCh
BFqmGfrNLQfhzJWBhRJwJR
LFqFQjrcrcqFNMmMdHggntDPMnsDbn
NmWmPblGnnTTNlFGPmNWfwdchdlHdBdwcfCfZppZ
rzqzRjgVrJrzzcFdqdCBFBhZhH
VDRsRMjRJJrQsJPTGFNvsbnsnLGm
nrbrBLTffjNRzGQSJHJQGT
tcZqMcppCmHRQPGGCG
pMDcZhpgcpFDfrwNDDrLVjGj
LWlmlmWqvrBMWWBlmjLThBrfPJZfZZCwPCJJwPCTcggCsd
pSbRHbzpHDVFRQRfPdfnZswgcJcppp
SzRNGbzSWNPLWqLv
vqslblpspsvqBFSqcrrZZDdTfFPHccrf
GWRhWmjwhRcQdCDrPjDP
mcWLVnnWJgGRzVSsVSpSSptNpMvb
wHTPfdTvHlPHGpdvvTddGfcJLLWWwWWcCWrqrVMWCVLL
zhsSNZhnshNSnvZmvsCWWSLrVMcrSCLWJcrq
snDnshmNsjnTdHPfDGvdDT
CfrnFFMnnsRNrNCwFCrdssgqgqvVZvZqlTWBNWZqlJBW
htDhDLhwPWWBqTghgB
DPLPzHDtSPStjLGLtzSMwbdMdnCHrRdCFsmfnR
nBNWCvJmVPNnCPNDJWbtmSwqTttcQsSqtqTjQQ
pMflzLlffRRMRdFlflpLddGdsTjwHqzcvwTqtsStQQjtwwsQ
ZhGlphlpvvLLfFGvMLhfrfWNJNNPVPbnPhnDgDbDDNbJ
ZCpCmVlZvlpBBwvvMCrJhrfhMfjjWMSG
qhstFzFFqzHGzNfSMJSGzM
QnHRPRgRQPtPhtnDsqsbDQPBlTcpBwmVmTvbwdwBTVZVpl
PHmqHdddqBWMmTvMvTGMBWPdwhssnnHlhgsNwhwNHQzwrswh
cSbVcDLtbfLSFzhlhJswgtrsww
bSLlFLFFLDZVLpZVjFLdPMdBBqGGPmmqWGdGjM
FQCnQwFRbnrSfgQgwFRCnswmPLpMppPdMMllpLMptMLldPSZ
cJhhJcJVBJjhfHDvJqThvVDcpdGGqdZGdlltpqWdMqpdGWtG
HhzTjJBzJTvNJHvzvvNBzBFnFCNCbCwrbnRbgRwfwQsg
jRzDgbDDQDgVqqDGsjttNdwqNJZNwNdTWrpB
MHvvvlSHFllMhhMrpWBJtlWdpJrTwZ
mFcFFHmCmtcvfvFFHHLDGnRVzjDgnmgmnzGgGg
JJhDpDdmsJJdgmhrpPjGjFLPPSNpjL
WbznbRGnPfrfRSrN
WqGnnVGVMGHtWTCgJvZHggBggZCg
wlrPQtZQvwrzlvNfZLMZBjbbqjqLbSBjTg
PGJDVdsdhsPVPjbTcLcGLgjqbM
VPDRHWRdsRQvpfmmlw
pvTZTSpTZvGGphNvvbDpdrMqrjlWdPqqjWdldNrd
gmmJmsQfJgcRQJQJJncVQjMWllSnqljqBlPPjPHHHH
QVJQRVcwmJcchwpSZLwGbSZZ
zjrDMWcjDzQjDlWrnqqRBRNhBJRBhBJqnf
TTGPPdgGLwdHGwGPTgLbbvhHtRRNRRSfchqRvSqHRJ
TZTccPpdZwPQjllsspjVzD
jHLHhHFRjhcblDRRWbWTdtppLTntTnMmGLMvTp
BBQBgBBCrrgqJqTtMZMpngdtpvpG
QJJJQrsVsQQfQVPCNqsNSjHdhhdRHDNHFHFclh
RbCLnvdtnLRLRbmLPpHdQCvmNJpJSZSJlgDzglGlzcclcDGD
qBBwMjfsFMjsMbfWbwjlzDZlcWclJczgNDGNDl
wqjhrwwhhCvbQPrRnC
vpWDDDWZQQNGllwHlwWVGj
LCPdqdcdtsvdsCtsddvmVrVjjrBwHlmswmBnmw
fLfvSgvMfdCPqzZNThfNNpTJJQ
CVVVLbNVmGNQbGbGHHbHbvdwgQlwJDTFgJQdDZDJFD
ssWBsBWrjSzWrPtBjnSCTwvFZlDjwZDdgwTDwggv
nntPBqBrPsBfnCRCBWzCVcGVHMLNcbHLNmHqGphp
sbbwwzdsbqQQbQnnNbPNGbznHHRdLTggMVHFVvRZTRVRHMZF
mWffDWfflBpfmcWjWrrJVvgRLlMZVVhMFFTlHhMM
rJJCctmjcfvzsqsqbtbqPP
HGWjHWzVctQVcJVtjvRsvLTddqDDDsjRLg
bbMnlNChZQLZhdDs
SMMMMMMNmMllSlrmCczGcVzBcGWFBQGcrt
VwQlqcLfdLGqdqDjjgZrjZBdttjd
zSPPPJzJGjJjZrCBDt
WMTMsTWsccsvGGwH
hZvbQrjTTZjZcjWNrjnQrcTRpGMqcRfRRGzHfHfpfRMqRz
mDJlFmwCVVwbCVbPBRLMMLpRLwRLHqpR
gsCmgJsPDCtCVlvbhgQjhgQbnQbd
fSgbhhGPGJGhRDmlhhHcHDBH
LsMwQWFswsQMsQMvjslcBcDldBTWfDcHRRdl
ZpVFwLQwVLQvCVsMjrJbbCNPbzSJtPbPPf
VDzWMCpfCcCRDzqDzqNnvLZnfntHQnPPLQlt
sJmdbTBdmmGhFhhbJNNQlJnQlQLHPZNn
sdwmwsdrmMRpDRMLcw
JpWmSWpCnCbJBZHZVldbdfZf
rgdrgNdrjgNPrMjwTssrPdfDZqsVfQHDFlQDDHQVsZfB
TRPdNNLgjNwrRTrJpppzCmzmCLSnvS
QbtQJHQmbmfmBRvbQRzBvldqcFljsGcFdGdvsqqGls
ChCPWhDhWZWJVnZpCNChhVDcMcDdcdgGscjgFjGFlsjjGq
WZNTWNhNZfJJbTJTmR
CHGCHFcZvCrchrZrhsVtsBQjMstfZMMBgg
NNqwDLmDjJgQBmVQ
wdWLLTgWRTWcCcbrHCHhGW
bTZZvNjNjLgTCHcWhccfhWJdhvnc
mnFFmPGSwRPShzVPPWPdhhzr
FRtBFGBMFQFttRwtZgTjCTnQNbNLjTCH
bJSqrSpDJbSNbFjSFCfPWGcwGWPrcTCfwr
tRtLhDsvhQZlHRhRtQQnCnCcdwCPwTwdGcGP
HsHvsmBZvmvsmBhHvLssVqDSNgFMDzgbbDVJzbpMVq
nSSDHRRRQRBCLCQC
qGmfPzGmGlrrrpfrqlzrJtLvBlhQbSCvbtCtlFhLFC
zzpmqqJJVVfJfPfMpfdHNndsNwDSMSDDNcsc
CscQsVMhCsMsMHhhVthtwmgZNRqzWLBRLRLmBWmZWBND
JQJdddrjrLqBgDBq
QbFlTffpMbMnsPCh
gDdbVbVDddDfVfWQfBRLQZsZLRQQ
FCCTrGCMStwGHTtTWLQhLZrlRssRhRhp
FSHqtFTmFwmCsSwGTHtMTSdjjcdnVddgzmbVmjmndbbD
JtBBMcLWLdfFLhMttcWWhfWLrTRGFsbwTmRGwmwbbCTGGsbD
PzQpSQQQvzVvpzHqjvNvQSvGRmmTDVRDmsGsRGsrcDcDGC
cQPHSPvPvZHqcZjzpZjnZNtWlLdtldJWfnfhlJJtLdMg
nPPssTBnMJPdtHPVHtRhpv
bSSgGFWDgWwDFFlmWlcShqdpRqpVcHvvnqpvpRHd
bGFnGljgSsjBCTBszz`;

    test('part 1', () => {
      expect(part1(input)).toEqual(7746);
    });

    test('part 2', () => {
      expect(part2(input)).toEqual(2604);
    });
  });
});
