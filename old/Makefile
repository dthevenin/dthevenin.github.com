##############################################################
##                    COPYRIGHT NOTICE
##
## Copyright (C) 2009-2013. ViniSketch  (c) All rights reserved
##
##############################################################

###                     Declaration 
##############################################################

SHELL = /bin/sh
CHMOD = chmod
CP = cp
XTEMP = ../lib/manage_template.sh 
MV = mv
NOOP = $(SHELL) -c true
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = mkdir -p
CAT = cat
MAKE = make
OPEN = open
ECHO = echo
ECHO_N = echo -n
JAVA = java
COMPILE = $(JAVA) -jar tools/closurecompiler/compiler.jar --language_in=ECMASCRIPT5
COMPILE_ADV = $(JAVA) -jar tools/closurecompiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
COMPILE_YUI = $(JAVA) -cp tools/yuicompressor/jargs-1.0.jar:tools/yuicompressor/rhino-1.6R7.jar -jar tools/yuicompressor/yuicompressor-2.4.2.jar
GENDOC = $(JAVA) -jar tools/jsdoc-toolkit/jsrun.jar tools/jsdoc-toolkit/app/run.js 
COMPILE_LESS = /usr/local/bin/lessc

###                         RELEASE
##############################################################

all :: clean makedirs extern_libs

clean:
	$(RM_RF) js
	$(RM_RF) tmp
		
makedirs:
	$(MKPATH) js/

###                    libs
##############################################################

extern_libs: js/vs_util_min.js js/vs_transform_min.js js/vs_gesture_min.js
	
js/vs_util_min.js:
	-$(MKPATH) tmp/
	git clone https://github.com/dthevenin/Util.git tmp
	-$(CP) tmp/build/vs_util_min.js js/vs_util_min.js
	-$(CP) tmp/build/firminCSSMatrix_min.js js/firminCSSMatrix_min.js
	-$(RM_RF) tmp

js/vs_transform_min.js:
	-$(MKPATH) tmp/
	git clone https://github.com/dthevenin/Transform.git tmp
	-$(CP) tmp/build/vs_transform_min.js js/vs_transform_min.js
	-$(RM_RF) tmp
	
js/vs_gesture_min.js:
	-$(MKPATH) tmp/
	git clone https://github.com/dthevenin/Gesture.git tmp
	-$(CP) tmp/build/vs_gesture_min.js js/vs_gesture_min.js
	-$(RM_RF) tmp